import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { CategoryTableComponent } from './components/user-table/category-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddCategoryFormComponent } from './components/add-category-form/add-category-form.component';
import { EditCategoryComponent } from './pages/edit-category/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ListCategoryComponent,
        CategoryTableComponent,
        AddCategoryComponent,
        AddCategoryFormComponent,
        EditCategoryComponent,
    ],
    imports: [
        CommonModule,
        CategoryManagementRoutingModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class CategoryManagementModule { }
