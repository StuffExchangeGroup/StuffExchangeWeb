import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { PopupNotificationComponent } from 'src/app/common/components/popup-notification/popup-notification.component';
import { ConfirmStatus } from 'src/app/common/enum/confirm-status';
import { ExchangeAction } from 'src/app/common/enum/exchange-action';
import { ExchangeStatus } from 'src/app/common/enum/exchange-status';
import { NotificationAction } from 'src/app/common/enum/notification-action';
import { SwapType } from 'src/app/common/enum/swap-type';
import { IDataResponse } from 'src/app/common/models/data-response';
import { NotificationContent } from 'src/app/common/models/popup-notification-content';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { IDetailExchange } from '../../models/IDetailExchange';
import { ExchangeService } from '../../service/exchange.service';

@Component({
    selector: 'app-detail-item-exchange',
    templateUrl: './detail-item-exchange.component.html',
    styleUrls: ['./detail-item-exchange.component.scss']
})
export class DetailItemExchangeComponent implements OnInit {

    public detailExchanges?: IDetailExchange[];
    public totalExchange?: number = 0;
    public errorMessage?: string;
    @Input() currentProductId: number | undefined;
    @Output() detailExchange = new EventEmitter<IDetailExchange>();

    constructor(private exchangeService: ExchangeService,
        private spinner: NgxSpinnerService,
        private toastrService: CustomToastrService,
        private popUpNotification: MatDialog,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.currentProductId) {
            this.getExchangeByProductId(this.currentProductId);
        } else {
            this.detailExchanges = [];
            this.errorMessage = "Chưa có trao đổi nào";
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentProductId'].currentValue !== 0) {
            this.getExchangeByProductId(changes['currentProductId'].currentValue);
        } else {
            this.detailExchanges = [];
        }
    }

    getExchangeByProductId(productId: number) {
        this.spinner.show();
        this.exchangeService.getDetailExchangeByProductId(productId, SwapType.ALL).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.detailExchanges = res.data.myExchanges;
                    this.totalExchange = res.data.total;
                    if (res.data.total > 0) {
                        this.errorMessage = undefined
                    } else {
                        this.errorMessage = "Sản phẩm chưa được trao đổi, Trao đổi ngay"
                    }
                }
            },
            error: (e) => {
                this.errorMessage = e.error.errorMessage.message;
                console.log(e);
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        });
    }

    onConfirmSwap(detailExchange: IDetailExchange, exchangeIndex: number) {
        let notificationMessage = "Bạn có chắc chắn muốn chấp nhận yêu cầu này không?";
        if (detailExchange.ownerConfirm === ConfirmStatus.ACCEPT) {
            notificationMessage = "Bạn có chắc chắn muốn hủy yêu cầu này không?";
        }
        const notificationContent = new NotificationContent("", notificationMessage, "");

        const popUpRef = this.popUpNotification.open(PopupNotificationComponent, { data: notificationContent });

        popUpRef.afterClosed().subscribe(
            action => {
                if (action && action.event === NotificationAction.ACCEPT) {
                    this.confirmSwap(detailExchange, exchangeIndex);
                }
            }
        );
    }

    async confirmSwap(detailExchange: IDetailExchange, exchangeIndex: number) {
        let exchangeId = detailExchange.exchangeId;

        let isConfirmSuccess = false;
        // if ownerConfirm is accept
        if (detailExchange.ownerConfirm === ConfirmStatus.ACCEPT) {
            // then cancel request
            isConfirmSuccess = await this.postConfirmSwap(exchangeId, ExchangeAction.CANCEL);
            // remove exchange if exchangeConfirm have not accept
            if (detailExchange.exchangerConfirm !== ConfirmStatus.ACCEPT) {
                this.removeItemDetailExchanges(exchangeIndex);
            }
            else {
                this.updateExchangeAfterConfirm(exchangeId, ConfirmStatus.CANCEL);
            }
            if (isConfirmSuccess) {
                if (detailExchange.chatting) {
                    // if conversation was started then stop it
                    this.updateExchangeAfterStartConversation(exchangeId, detailExchange.chatting);
                }
            }
        }
        else {
            // if ownerConfirm is cancel or waiting
            isConfirmSuccess = await this.postConfirmSwap(exchangeId, ExchangeAction.ACCEPT);
            this.updateExchangeAfterConfirm(exchangeId, ConfirmStatus.ACCEPT);
        }
        this.toastrService.success("Thay đổi trang thái thành công", "");
    }

    // call api to confirm exchange
    async postConfirmSwap(exchangeId: number, exchangeConfirm: ExchangeAction): Promise<boolean> {
        this.spinner.show();
        const confirmSwapObservable = this.exchangeService.confirmSwap(exchangeId, exchangeConfirm);
        try {
            const confirmSwapRes: IDataResponse<any> = await lastValueFrom(confirmSwapObservable);
            this.spinner.hide();
            if (confirmSwapRes.isSuccess) {
                return true;
            }
        }
        catch (error) {
            this.spinner.hide();
        }
        return false;
    }

    // update confirm status and change css
    updateExchangeAfterConfirm(exchangeId: number, ownerConfirm: ConfirmStatus) {
        this.detailExchanges?.forEach((detailExchange) => {
            if (detailExchange.exchangeId === exchangeId) {
                detailExchange.ownerConfirm = ownerConfirm;

                const ownerIcon = document.getElementById(`icon-${detailExchange.exchangeId}-${detailExchange.myProduct.productId}`);

                if (ownerConfirm === ConfirmStatus.ACCEPT) {
                    ownerIcon?.classList.add('accept-icon');
                } else {
                    ownerIcon?.classList.remove('accept-icon');
                }
            }
        });
    }

    // update exchange status and change css for it
    updateExchangeAfterStartConversation(exchangeId: number, chatting: boolean) {
        this.detailExchanges?.forEach((detailExchange) => {
            if (detailExchange.exchangeId === exchangeId) {
                if (chatting) {
                    detailExchange.chatting = false;
                    this.toastrService.success("Đã hủy cuộc hội thoại thành công", "");
                } else {
                    detailExchange.chatting = true;
                    this.toastrService.success("Bắt đầu cuộc hội thoại thành công", "");
                }
            }
        });
    }

    // delete item in exchange array
    removeItemDetailExchanges(exchangeIndex: number) {
        this.detailExchanges?.splice(exchangeIndex, 1);
    }

    onStartConversation(detailExchange: IDetailExchange, exchangeIndex: number) {
        let notificationMessage = "Bạn có chắc chắn muốn bắt đầu cuộc hội thoại không?";
        if (detailExchange.chatting) {
            notificationMessage = "Bạn có chắc chắn muốn kết thúc cuộc hội thoại này không?";
        }
        const notificationContent = new NotificationContent("", notificationMessage, "");

        const popUpRef = this.popUpNotification.open(PopupNotificationComponent, { data: notificationContent });

        popUpRef.afterClosed().subscribe(
            action => {
                if (action && action.event === NotificationAction.ACCEPT) {
                    this.startConversation(detailExchange, exchangeIndex);
                }
            }
        );
    }

    async startConversation(detailExchange: IDetailExchange, exchangeIndex: number) {
        if (detailExchange.exchangerConfirm !== ConfirmStatus.ACCEPT) {
            this.toastrService.error("Đối tác của bạn chưa chấp nhận yêu cầu", "");
            return;
        }
        let exchangeId = detailExchange.exchangeId;

        // ownerConfirm have not accept and chatting is false
        if (detailExchange.ownerConfirm !== ConfirmStatus.ACCEPT && !detailExchange.chatting) {
            // await this.confirmSwap(detailExchange, exchangeIndex);
            this.toastrService.info("Bạn phải chấp nhập yêu cầu trước khi vào cuộc hội thoại!", "");
            return;
        }
        // this.detailExchange.next(detailExchange);

        this.spinner.show();

        this.exchangeService.startConversation(exchangeId).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.updateExchangeAfterStartConversation(exchangeId, detailExchange.chatting);
                    this.detailExchange.next(detailExchange);
                }
                console.log(res)
            },
            error: () => {
                this.spinner.hide();
                this.toastrService.error("Đã xảy ra lỗi, vui lòng thử lại sau", "");
            },
            complete: () => {
                this.spinner.hide();
            }
        });
    }

    seeMyDetailProduct(detailExchange: IDetailExchange) {
        this.router.navigate(['profile/product/detail/', detailExchange.myProduct.productId]);
    }

    seeDetailProduct(detailExchange: IDetailExchange) {
        this.router.navigate(['products/', detailExchange.exchangeProduct.productId]);
    }

    trackId(index: number, item: IDetailExchange): number {
        return item.exchangeId!;
    }
}
