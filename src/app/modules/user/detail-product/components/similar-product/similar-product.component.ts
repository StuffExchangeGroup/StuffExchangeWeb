import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getCondition } from 'src/app/common/functions/GetCondition';
import { ICardSimilar, IProductSimilar } from '../../models/ISimilarProduct';
import { DetailProductService } from '../../services/detail-product.service';
@Component({
    selector: 'app-similar-product',
    templateUrl: './similar-product.component.html',
    styleUrls: ['./similar-product.component.scss']
})
export class SimilarProductComponent implements OnInit {
    public showLoadingDetail?: boolean;
    public products?: ICardSimilar[];
    public cardProductsRes?: IProductSimilar;
    public productId: number;
    public getCondition = getCondition;
    public categoryId: number = 0;

    @Output() isSimilarLoading = new EventEmitter<boolean>();

    constructor(
        private detailProductService: DetailProductService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.productId = 0;
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.productId = params['id'];
        });
        this.getData()
    }

    getData(): void {
        this.showLoadingDetail = true
        this.detailProductService.querySimilarProduct(this.productId)
            .subscribe({
                next: (result) => {
                    if (result.isSuccess) {
                        if (result.data.products.length > 0) {
                            this.cardProductsRes = result.data
                            this.products = this.cardProductsRes?.products
                            this.categoryId = result.data.products[0].categoryId
                        }
                    }
                },
                error: (e) => {
                    this.showLoadingDetail = false
                    this.isSimilarLoading.emit(this.showLoadingDetail)
                    //   this.messageError = e.error.errorMessage.message
                },
                complete: () => {
                    this.showLoadingDetail = false;
                    this.isSimilarLoading.emit(this.showLoadingDetail)
                }
            });
    }

    calculateDate(createdDate: string): number {
        let createdDateProduct = new Date(createdDate);

        let currentDate = new Date();
        let times = currentDate.getTime() - createdDateProduct.getTime();
        let days = times / (1000 * 3600 * 24);
        return Math.ceil(days);
    }

    viewAllSimilarProduct() {
        if (this.categoryId !== 0) {
            this.router.navigate(['/products'], { queryParams: { categoryId: this.categoryId } });
        }
    }
}
