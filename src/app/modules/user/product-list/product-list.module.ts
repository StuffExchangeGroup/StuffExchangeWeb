import { CommonComponentsModule } from 'src/app/common/components/components.module';
import { FavouriteComponent } from './../../../common/components/favourite/favourite.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { FilterComponent } from './components/filter/filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SortComponent } from './components/sort/sort.component';


@NgModule({
    declarations: [
        FilterComponent,
        ProductsComponent,
        ProductListComponent,
        SortComponent,
    ],
    imports: [
        CommonModule,
        ProductListRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        CommonComponentsModule
    ]
})
export class ProductListModule { }
