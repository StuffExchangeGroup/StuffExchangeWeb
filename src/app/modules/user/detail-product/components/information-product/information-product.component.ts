import { Condition } from './../../../../../common/enum/condition';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductDetail } from '../../models/IProductDetail';
import { DetailProductService } from '../../services/detail-product.service';
import { Status } from "src/app/common/enum/status-product";
import { MatDialog } from '@angular/material/dialog';
import { PopupSwapComponent } from '../popup-swap/popup-swap.component';
@Component({
    selector: 'app-information-product',
    templateUrl: './information-product.component.html',
    styleUrls: ['./information-product.component.scss']
})
export class InformationProductComponent implements OnInit {
    public showLoadingDetail?: boolean;
    public productId: number;
    public product?: IProductDetail;
    public productImages: string[];
    public isFavourite: boolean = false;
    public shareUrl?: string;
    public shareUrlToFb?: string;

    @Output() productInfoRow = new EventEmitter<{
        category: string,
        productName: string,
        description: string,
        notice: string,
        productId: number
    }>();

    @Output() isInfoLoading = new EventEmitter<boolean>();

    constructor(
        private detailProductService: DetailProductService,
        private route: ActivatedRoute,
        private popUp: MatDialog,
        private router: Router
    ) {
        this.productId = 0;
        this.productImages = [];
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.productId = params['id'];
        });

        this.shareUrl = document.location.href;
        this.shareUrlToFb = 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F' + window.location.hostname + '%3A' + window.location.port + '%2F%23%2Fproducts%2F' + this.productId + '&amp;src=sdkpreparse';

        this.getData();
        this.loadScript();
    }

    public loadScript() {
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://sp.zalo.me/plugins/sdk.js';
        script.async = true;
        script.defer = true;
        body.appendChild(script);
    }

    getData(): void {
        this.showLoadingDetail = true
        this.detailProductService.queryDetailProduct(this.productId)
            .subscribe({
                next: (result) => {
                    if (result.isSuccess) {
                        this.product = result.data.product
                        this.productImages = this.product.imageLinks;
                        this.isFavourite = this.product.isFavorite

                        this.productInfoRow.emit({
                            category: this.product.categoryName,
                            productName: this.product.title,
                            description: this.product.description,
                            notice: this.product.notice,
                            productId: this.product.id
                        })
                    }
                },
                error: (e) => {
                    this.showLoadingDetail = false
                    this.isInfoLoading.emit(this.showLoadingDetail)
                    //   this.messageError = e.error.errorMessage.message
                },
                complete: () => {
                    this.showLoadingDetail = false;
                    this.isInfoLoading.emit(this.showLoadingDetail)
                }
            });
    }

    getStatus(status?: Status) {
        if (status as Status === Status.AVAILABLE as Status) {
            return "Sẵn có";
        } else if (status === Status.SWAPPED) {
            return "Đã trao đổi";
        }
        return "";
    }

    getCondition(condition?: Condition) {
        if (condition as Condition === Condition.NEW as Condition) {
            return "Mới"
        } else if (condition === Condition.LIKENEW) {
            return "Hàng 99%"
        } else if (condition == Condition.USED) {
            return "Đã sử dụng"
        }
        return "";
    }

    openPopUpSwap() {
        this.popUp.open(PopupSwapComponent, { data: this.productId });
    }

    closePopUpSwap() {
        this.popUp.closeAll();
    }

    favoriteCountChangeHandler(value: number) {
        if (this.product) {
            this.product.likedCount = this.product.likedCount + value;
        }
    }
}
