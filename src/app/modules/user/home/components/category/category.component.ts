import { HomeService } from './../../services/home.service';
import { ICategory } from './../../models/ICategory';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    public isLoading?: boolean
    public categories?: ICategory[]

    @Output() isCategoryLoading = new EventEmitter<boolean>();

    constructor(private homeService: HomeService) { }

    ngOnInit(): void {
        this.getAll()
    }

    public getAll(): void {
        this.isLoading = true
        this.homeService.getAllCategories().subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.categories = res.data.categories
                }
            },
            error: (e) => {
                this.isLoading = false;
                this.isCategoryLoading.emit(this.isLoading)
            },
            complete: () => {
                this.isLoading = false;
                this.isCategoryLoading.emit(this.isLoading)
            }
        })
    }

    trackId(index: number, item: ICategory): number {
        return item.id!;
    }

}
