import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
    public _showSimilarProduct: boolean = true;
    public _showInfoProduct: boolean = true;

    public productName?: string;
    public category?: string;
    public description?: string;
    public notice?: string;
    constructor(private spinner: NgxSpinnerService,
        private router: Router) {
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        this.spinner.show();
    }

    getInfoRow(productInfo: any) {
        this.productName = productInfo.productName;
        this.category = productInfo.category;
        this.description = productInfo.description
        this.notice = productInfo.notice;
    }

    isSimilarLoading(isLoading: any) {
        this._showSimilarProduct = isLoading;
        this.showOrHideLoading();
    }

    isInfoLoading(isLoading: any) {
        this._showInfoProduct = isLoading;
        this.showOrHideLoading();
    }

    showOrHideLoading(): void {
        if (!this._showSimilarProduct && !this._showInfoProduct) {
            this.spinner.hide();
        }
    }


}
