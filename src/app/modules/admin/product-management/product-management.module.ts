import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductTableComponent } from './components/product-table/product-table.component';


@NgModule({
    declarations: [
        ListProductComponent,
        ProductTableComponent,
    ],
    imports: [
        CommonModule,
        ProductManagementRoutingModule,
        NgxSpinnerModule,
    ]
})
export class ProductManagementModule { }
