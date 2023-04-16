import { MessagingService } from './../../../../../common/services/message.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-home-template',
    templateUrl: './home-template.component.html',
    styleUrls: ['./home-template.component.scss']
})
export class HomeTemplateComponent implements OnInit {
    public _showLoadingTrending: boolean = true;
    public _showLoadingCate: boolean = true;
    public _showLoadingNewest: boolean = true;

    constructor(
        private spinner: NgxSpinnerService,
        private messagingService: MessagingService
    ) {
    }

    ngOnInit(): void {
        this.spinner.show();
    }

    isCategoryLoading(isLoading: any) {
        this._showLoadingCate = isLoading;
        this.showOrHideLoading()
    }

    isTrendingLoading(isLoading: any) {
        this._showLoadingTrending = isLoading;
        this.showOrHideLoading()
    }

    isNewestLoading(isLoading: any) {
        this._showLoadingNewest = isLoading;
        this.showOrHideLoading();
    }

    showOrHideLoading(): void {
        if (!this._showLoadingCate && !this._showLoadingTrending && !this._showLoadingNewest) {
            this.spinner.hide();
        }
    }
}
