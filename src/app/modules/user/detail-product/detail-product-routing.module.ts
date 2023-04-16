import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './page/detail-product/detail-product.component';

const routes: Routes = [
    {
        path: '',
        component: DetailProductComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailProductRoutingModule { }
