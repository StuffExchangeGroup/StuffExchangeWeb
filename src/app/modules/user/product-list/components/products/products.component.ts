import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPaginate } from './../../../../../common/models/pagination';
import { Condition } from './../../../../../common/enum/condition';
import { IProduct } from './../../models/IProduct';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { getCondition } from 'src/app/common/functions/GetCondition';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    public getCondition = getCondition
    @Input() products!: IProduct[];
    @Input() paginate!: IPaginate;
    @Input() set showLoadingProducts(value: boolean) {
        value ? this.snipper.show() : this.snipper.hide()
    }

    @Output() pageChangeEvent = new EventEmitter<number>();

    constructor(private snipper: NgxSpinnerService,
        private router: Router) { }

    ngOnInit(): void {
        this.snipper.show()
    }

    onPageChange(event: number) {
        this.pageChangeEvent.emit(event);
    }

    calculateDate(createdDate: string): number {
        let createdDateProduct = new Date(createdDate);

        let currentDate = new Date();
        let times = currentDate.getTime() - createdDateProduct.getTime();
        let days = times / (1000 * 3600 * 24);
        return Math.ceil(days);
    }

    trackId(index: number, item: IProduct): number {
        return item.id!;
    }
}
