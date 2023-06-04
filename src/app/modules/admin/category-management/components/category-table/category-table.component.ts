import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ICategory } from '../../models/ICategory';
// import { IListUserReponse } from '../../models/IUser';

@Component({
    selector: 'app-category-table',
    templateUrl: './category-table.component.html',
    styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {
    @Input() ListCategory?: ICategory[];
    @Input() set showLoadingCategories(value: boolean) {
        value ? this.spinner.show() : ''
        this._showLoadingCategory = value;
    }

    @Output() editCategoryEvent = new EventEmitter<string>();
    @Output() deleteCategoryEvent = new EventEmitter<string>();

    public _showLoadingCategory!: boolean;

    constructor(private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
    }

    public editCategory(category: ICategory): void {
        // this.editCategoryEvent.emit(category.id)
    }

    public blockCategory(category: ICategory): void {
        // this.deleteCategoryEvent.emit(user.id)
    }
}
