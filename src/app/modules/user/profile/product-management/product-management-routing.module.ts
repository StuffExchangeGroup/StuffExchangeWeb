import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { PostProductComponent } from './pages/post-product/post-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';

const routes: Routes = [
    {
        path: 'list',
        component: ProductListComponent
    },
    {
        path: 'detail/:id',
        component: ProductDetailComponent
    },
    {
        path: 'post',
        component: PostProductComponent
    },
    {
        path: 'update/:id',
        component: UpdateProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
