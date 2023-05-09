import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { ListCategoryComponent } from './pages/list-category/list-category.component';


@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule
  ]
})
export class CategoryManagementModule { }
