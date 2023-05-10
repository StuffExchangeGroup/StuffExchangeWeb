import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { CategoryTableComponent } from './components/user-table/category-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ListCategoryComponent,
    CategoryTableComponent
  ],
  imports: [
    CommonModule,
    CategoryManagementRoutingModule,
    NgxSpinnerModule
  ]
})
export class CategoryManagementModule { }
