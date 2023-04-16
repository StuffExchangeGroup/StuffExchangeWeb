import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupNotificationComponent } from 'src/app/common/components/popup-notification/popup-notification.component';
import { NotificationAction } from 'src/app/common/enum/notification-action';
import { Status } from 'src/app/common/enum/status-product';
import { NotificationContent } from 'src/app/common/models/popup-notification-content';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { IMyProduct } from '../../../models/IProductManagement';
import { ProductManagementService } from '../../../service/product-management.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

    public myProducts?: IMyProduct[];

    constructor(private productManagementService: ProductManagementService,
        private spinner: NgxSpinnerService,
        private toastrService: CustomToastrService,
        private popUpNotification: MatDialog
    ) { }
    ngOnInit(): void {
        this.getMyProducts(Status.ALL);
    }
    getMyProducts(status: Status) {
        this.spinner.show();

        this.productManagementService.getMyProducts(status).subscribe({
            next: (res) => {
                this.myProducts = res.data.myItems;
            },
            error: (e) => {
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        })
    }
    onSelectFilter(event: any) {
        const productStatus = event.target.value;
        if (productStatus === "SWAPPED") {
            this.getMyProducts(Status.SWAPPED)
        } else if (productStatus === "AVAILABLE") {
            this.getMyProducts(Status.AVAILABLE)
        } else {
            this.getMyProducts(Status.ALL);
        }
    }

    convertCreatedDate(createdDate: Date): string {
        const date: Date = new Date(createdDate);
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }

    onDeleteProduct(productId: number, productIndex: number) {
        const notificationContent = new NotificationContent("", "Bạn có chắc chắn muốn xóa sản phẩm này không?", "");

        const popUpRef = this.popUpNotification.open(PopupNotificationComponent, { data: notificationContent });

        popUpRef.afterClosed().subscribe(
            action => {
                if (action && action.event === NotificationAction.ACCEPT) {
                    this.deleteProduct(productId, productIndex);
                }
            }
        )


    }

    deleteProduct(productId: number, productIndex: number) {
        this.spinner.show();
        this.productManagementService.deleteMyItemById(productId).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastrService.success("Đã xóa sản phẩm", "Xóa sản phẩm thành công");
                    this.onRemoveItem(productIndex);
                }
            },
            error: (e) => {
                this.spinner.hide();
                this.toastrService.error("Không thể xóa sản phẩm", e.error.errorMessage.message);
            },
            complete: () => {
                this.spinner.hide();
            }
        });
    }

    onRemoveItem(productIndex: number) {
        this.myProducts?.splice(productIndex, 1);
    }

}
