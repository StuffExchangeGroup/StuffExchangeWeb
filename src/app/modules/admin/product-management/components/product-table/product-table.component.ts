import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct } from '../../models/IProduct';
// import { IListUserReponse } from '../../models/IUser';

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
    @Input() ProductList?: IProduct[];
    @Input() set showLoadingCategories(value: boolean) {
        value ? this.spinner.show() : ''
        this._showLoadingCategory = value;
    }

    @Output() editProductEvent = new EventEmitter<string>();
    @Output() deleteProductEvent = new EventEmitter<string>();

    public _showLoadingCategory!: boolean;

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        console.log(this.ProductList)
    }

    public editProduct(category: IProduct): void {
        // this.editUserEvent.emit(category.id)
    }

    public deleteProduct(category: IProduct): void {
        // this.deleteUserEvent.emit(user.id)
    }
}
