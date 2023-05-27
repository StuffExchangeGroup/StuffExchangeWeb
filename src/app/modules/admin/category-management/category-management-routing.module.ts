import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { EditCategoryComponent } from './pages/edit-category/edit-user.component';

const routes: Routes = [
    {
        path: 'list-category',
        component: ListCategoryComponent,
    },
    {
        path: 'add-category',
        component: AddCategoryComponent
    },
    {
        path: 'edit-category/:categoryId',
        component: EditCategoryComponent
    },
    {
        path: '**',
        redirectTo: 'list-category'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }
