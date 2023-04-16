import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Status } from 'src/app/common/enum/status-product';
import { AuthService } from 'src/app/common/services/auth.service';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { ExchangeService } from '../../../exchange/service/exchange.service';
import { IMyItem } from '../../models/IMyItem';
import { MyItemService } from '../../services/my-item.service';

@Component({
    selector: 'app-popup-swap',
    templateUrl: './popup-swap.component.html',
    styleUrls: ['./popup-swap.component.scss']
})
export class PopupSwapComponent implements OnInit {
    public isLoading?: boolean = true;
    public myItems: IMyItem[] = [];
    public itemActiveClass: string = "my-item-active";
    public sendProductId?: number;
    public isLoggedIn: boolean = true;

    constructor(
        private myItemService: MyItemService,
        private exchangeService: ExchangeService,
        private authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public receiveProductId: number,
        private dialogRef: MatDialogRef<PopupSwapComponent>,
        private toastrService: CustomToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getMyItem();
    }

    getMyItem() {
        if (!this.authService.isLoggedIn) {
            // if user have not login then stop isLoading and show go to login
            this.isLoading = false;
            this.isLoggedIn = false;
            return;
        }
        this.myItemService.queryMyItem(Status.AVAILABLE).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.myItems = res.data.myItems;
                }
            },
            error: (e) => {
                console.log(e);
                this.isLoading = false;
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    trackId(index: number, item: IMyItem): number {
        return item.id!;
    }

    onSelectedItem(itemId: number) {
        const currentActiveItem = document.getElementsByClassName(this.itemActiveClass);
        if (currentActiveItem.length > 0) {
            currentActiveItem[0].classList.remove(this.itemActiveClass);
        }
        const newActiveItem = document.getElementById(`item-${itemId}`);
        newActiveItem?.classList.add(this.itemActiveClass);
        this.sendProductId = itemId;
    }

    onSwapNow() {
        if (this.sendProductId === undefined || this.receiveProductId === undefined || this.isLoading) {
            return;
        }
        this.isLoading = true;
        this.exchangeService.postToSwap(this.sendProductId, this.receiveProductId).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastrService.success("Đã gửi yêu cầu trao đổi", '');
                }
            },
            error: (e) => {
                this.isLoading = false;
                const errorMessage = e.error.errorMessage.message;
                this.toastrService.error(errorMessage, "");
                this.closePopUp();
            },
            complete: () => {
                this.router.navigate(['/my-exchanges/' + this.sendProductId]);
                this.closePopUp();
                this.isLoading = false;
            }
        });
    }

    closePopUp() {
        this.dialogRef.close();
    }
}
