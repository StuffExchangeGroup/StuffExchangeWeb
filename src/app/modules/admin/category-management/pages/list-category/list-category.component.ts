import { Component, OnInit } from '@angular/core';
import { ICategory, ICategoryRes } from '../../models/ICategory';
import { CategoryManagementService } from '../../services/category-management.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  public categories?: ICategory[];
  public showLoadingCategories: boolean = false;

  constructor(private categoryService: CategoryManagementService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.showLoadingCategories = true;
        this.categoryService.getCategories()
        .subscribe({
            next: (result) => {
                this.categories = result.data.categories;
                console.log(result)
            },
            error: (e) => {
                this.showLoadingCategories = false;
            },
            complete: () => {
                this.showLoadingCategories = false;
            }
        });
  }

  public editCategory($event: string): void {
    this.router.navigate(['/admin/user-management/add-user']);
  }

  public deleteCategory($event: string): void {
      this.router.navigate(['/admin/user-management/edit-user/' + $event]);
  }

}
