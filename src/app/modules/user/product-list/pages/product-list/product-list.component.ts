import { NgxSpinnerService } from 'ngx-spinner';
import { SortComponent } from './../../components/sort/sort.component';
import { IPaginate } from './../../../../../common/models/pagination';
import { FormArray } from '@angular/forms';
import { Condition } from './../../../../../common/enum/condition';
import { IProduct } from './../../models/IProduct';
import { ProductService } from './../../services/product.service';
import { Filter } from '../../models/IFilter';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductType } from 'src/app/common/enum/product-type';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    public showLoadingProducts!: boolean;
    public products!: IProduct[];
    public paginate: IPaginate = {
        itemsPerPage: 0,
        currentPage: 0,
        totalItems: -1
    };
    public selectedCategoryId?: string;

    @ViewChild('sort') sortChild?: SortComponent;

    public filter: Filter = {
        page: 1,
        size: 12,
        type: null,
        conditions: null,
        purposeTypes: null,
        search: null,
        categoryIds: null,
        cityIds: null,
    }

    constructor(private productService: ProductService,
        private activatedRoute: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.activatedRoute.queryParamMap
            .subscribe(params => {
                const searchKey = params.get('search')?.trim();
                const categoryId = params.get('categoryIds');
                if (searchKey) {
                    this.setDefaultValue(); // set filter to default
                    this.filter.search = searchKey;
                    this.loadProductsByFilter(true);
                    return
                }

                if (categoryId) {
                    const categoryIds: number[] = [Number(categoryId)]
                    this.setDefaultValue(); // set filter to default
                    this.filter.categoryIds = categoryIds;
                    this.loadProductsByFilter(true);
                    this.selectedCategoryId = categoryId;
                    return;
                }

                this.loadProductsByFilter(true);
            });
    }

    public setDefaultValue(): void {
        this.filter = {
            page: 1,
            size: 12,
            type: null,
            conditions: null,
            purposeTypes: null,
            search: null,
            categoryIds: null,
            cityIds: null,
        };
    }

    public loadProductsByFilter(resetPage: boolean): void {
        // show loading
        this.showLoadingProducts = true;

        // reset page
        if (resetPage === true) {
            this.filter.page = 1;
        }

        // go to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' })

        this.productService.filterProduct(this.filter).subscribe({
            next: (res) => {
                if (res.isSuccess == true) {
                    this.products = res.data.filterProductRes.products;
                    this.paginate = res.data.filterProductRes.paginate;
                    this.paginate.currentPage += 1;
                }
            },
            error: (e) => {
                this.showLoadingProducts = false;
                console.log(e);
            },
            complete: () => this.showLoadingProducts = false
        })
    }

    public categoryChangeHandler($event: FormArray): void {
        this.filter.categoryIds = $event.value;
        this.loadProductsByFilter(true);
    }

    public cityChangeHandler($event: FormArray): void {
        this.filter.cityIds = $event.value;
        this.loadProductsByFilter(true);
    }

    public conditionChangeHandler($event: FormArray): void {
        this.filter.conditions = $event.value;
        this.loadProductsByFilter(true);
    }

    public purposeChangeHandler($event: FormArray): void {
        this.filter.purposeTypes = $event.value;
        this.loadProductsByFilter(true);
    }

    public sortChangeHandler($event: string): void {
        if (this.filter.type === $event) {
            return
        }
        this.filter.type = $event;
        this.loadProductsByFilter(true);
    }

    public pageChangeHandler($event: number): void {
        this.filter.page = $event;
        this.loadProductsByFilter(false);
    }

    public filterResetHandler(): void {
        // reset filter but keep search field
        const searchKey = this.filter.search
        this.setDefaultValue();
        if (searchKey) {
            this.filter.search = searchKey;
        }
        // reset sort session
        this.sortChild?.resetSort();
        this.loadProductsByFilter(true);
    }
}
