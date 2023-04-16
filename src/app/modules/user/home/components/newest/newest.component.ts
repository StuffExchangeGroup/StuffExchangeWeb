import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ICardProduct, IProductResponse } from '../../models/IHome';
import { HomeService } from '../../services/home.service';
import { getCondition } from 'src/app/common/functions/GetCondition';

@Component({
    selector: 'app-newest',
    templateUrl: './newest.component.html',
    styleUrls: ['./newest.component.scss']
})
export class NewestComponent implements OnInit {

    public showLoadingHome?: boolean
    public products?: ICardProduct[]
    public cardProductsRes?: IProductResponse
    public getCondition = getCondition

    @Output() isNewestLoading = new EventEmitter<boolean>();

    constructor(
        private homeService: HomeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getData()
    }

    getData(): void {
        this.showLoadingHome = true
        this.homeService.queryProductNewest()
            .subscribe({
                next: (result) => {
                    if (result.isSuccess) {
                        this.cardProductsRes = result.data
                        this.products = this.cardProductsRes?.products
                    }
                },
                error: (e) => {
                    this.showLoadingHome = false
                    this.isNewestLoading.emit(this.showLoadingHome)
                    //   this.messageError = e.error.errorMessage.message
                },
                complete: () => {
                    this.showLoadingHome = false;
                    this.isNewestLoading.emit(this.showLoadingHome)
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