import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICardProduct, IProductResponse } from '../../models/IHome';
import { HomeService } from '../../services/home.service';
import { getCondition } from 'src/app/common/functions/GetCondition';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
    public showLoadingHome?: boolean
    public products?: ICardProduct[]
    public cardProductsRes?: IProductResponse
    public getCondition = getCondition

    @Output() isTrendingLoading = new EventEmitter<boolean>();

    constructor(
        private homeService: HomeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.showLoadingHome = true
        this.homeService.queryProductTrending()
            .subscribe({
                next: (result) => {
                    if (result.isSuccess) {
                        this.cardProductsRes = result.data
                        this.products = this.cardProductsRes?.products
                    }
                },
                error: (e) => {
                    this.showLoadingHome = false
                    this.isTrendingLoading.emit(this.showLoadingHome)
                },
                complete: () => {
                    this.showLoadingHome = false
                    this.isTrendingLoading.emit(this.showLoadingHome)
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
}
