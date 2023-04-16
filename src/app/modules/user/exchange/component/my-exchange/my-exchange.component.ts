import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { ExchangeStatus } from 'src/app/common/enum/exchange-status';
import { IDataResponse } from 'src/app/common/models/data-response';
import { IMyExchange, IMyExchangeRes } from '../../models/IMyExchangeRes';
import { ExchangeService } from '../../service/exchange.service';

@Component({
    selector: 'app-my-exchange',
    templateUrl: './my-exchange.component.html',
    styleUrls: ['./my-exchange.component.scss']
})
export class MyExchangeComponent implements OnInit {

    public itemActiveClass = "my-exchange-active";
    public myExchanges?: IMyExchange[];
    public currentProductId_: number = 0;

    @Output() currentProductId = new EventEmitter<number>();

    constructor(private exchangeService: ExchangeService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        await this.getMyExchange(ExchangeStatus.ALL);

        this.route.params.subscribe(params => {
            const currentProductId = params['id'];
            if (currentProductId) {
                this.changeActiveItem(currentProductId);
                this.currentProductId.emit(currentProductId);
                this.currentProductId_ = currentProductId;
            }
        });
    }

    async getMyExchange(exchangeStatus: ExchangeStatus) {
        this.spinner.show();

        const getMyExchangeObservable = this.exchangeService.getMyExchange(exchangeStatus);
        const response: IDataResponse<IMyExchangeRes> = await lastValueFrom(getMyExchangeObservable);

        if (response.isSuccess) {
            this.myExchanges = response.data.myExchanges;
            if (response.data.myExchanges.length > 0) {
                const firstProductId = response.data.myExchanges[0].productId;
                this.currentProductId.emit(firstProductId);
                this.currentProductId_ = firstProductId;
            } else {
                this.currentProductId.emit(0);
            }
            this.changeActiveItem(this.currentProductId_);
        }
        this.spinner.hide();

    }

    transferExchangeStatus(exchangeStatus: ExchangeStatus): string {
        if (exchangeStatus === ExchangeStatus.SWAPPING) return "Đang trao đổi";
        if (exchangeStatus === ExchangeStatus.WAITING) return "Chờ trao đổi";

        return "";
    }

    onSelectItemExchange(productId: number) {
        if (this.currentProductId_ === productId) return;
        this.currentProductId_ = productId;
        this.currentProductId.emit(productId);
        this.changeActiveItem(productId);
    }

    changeActiveItem(productId: number) {
        const currentActiveItem = document.getElementsByClassName(this.itemActiveClass);
        if (currentActiveItem.length > 0) {
            currentActiveItem[0].classList.remove(this.itemActiveClass);
        }
        const itemId = `my-exchange-${productId}`;
        const newActiveItem = document.getElementById(itemId);
        newActiveItem?.classList.add(this.itemActiveClass);
    }

    filterExchangeByType(event: any) {
        const exchangeStatus: string = event.target.value;
        if (exchangeStatus === "SWAPPING") {
            this.getMyExchange(ExchangeStatus.SWAPPING);

        } else if (exchangeStatus === "WAITING") {
            this.getMyExchange(ExchangeStatus.WAITING);

        } else {
            this.getMyExchange(ExchangeStatus.ALL);
        }
    }

    trackId(index: number, item: IMyExchange): number {
        return item.exchangeId!;
    }
}
