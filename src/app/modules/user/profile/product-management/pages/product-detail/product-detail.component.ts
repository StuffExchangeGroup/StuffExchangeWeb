import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProductDetail } from '../../models/IProductDetail';
import { DetailProductService } from '../../services/detail-product.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    public productId!: number;
    public product?: IProductDetail;
    public _showSimilarProduct: boolean = true;
    public _showInfoProduct: boolean = true;
    public shareUrl?: string;
    public shareUrlToFb?: string;

    constructor(private spinner: NgxSpinnerService,
        private detailProductService: DetailProductService,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: CustomToastrService) {
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);

        this.route.params.subscribe(params => {
            this.productId = params['id'];
        });
        this.shareUrl = window.location.protocol + '//' + window.location.host + '/#/products/' + this.productId;
        this.shareUrlToFb = 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F' + window.location.hostname + '%3A' + window.location.port + '%2F%23%2Fproducts%2F' + this.productId + '&amp;src=sdkpreparse';

        this.getData();
    }

    getData(): void {
        this.spinner.show();
        this.detailProductService.queryDetailProduct(this.productId)
            .subscribe({
                next: (result) => {
                    if (result.isSuccess) {
                        this.product = result.data.product
                    }
                },
                error: (e) => {
                    this.spinner.hide();
                    this.router.navigateByUrl('/profile/product/list')
                    this.toastrService.error('Cảnh báo', 'Bạn không có quyền truy cập vào tài nguyên này')
                },
                complete: () => {
                    this.spinner.hide();
                }
            });
    }
}
