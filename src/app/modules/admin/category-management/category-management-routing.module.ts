import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './pages/list-category/list-category.component';

const routes: Routes = [
  {
    path: 'list-category',
    component: ListCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryManagementRoutingModule { }
