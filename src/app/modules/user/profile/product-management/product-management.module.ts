import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PostProductComponent } from './pages/post-product/post-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductInformationComponent } from './components/product-information/product-information.component';
import { ProductImageSlideComponent } from './components/product-image-slide/product-image-slide.component';
import { ProductDetailSlideComponent } from './components/product-detail-slide/product-detail-slide.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonComponentsModule } from 'src/app/common/components/components.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [
        ProductDetailComponent,
        PostProductComponent,
        UpdateProductComponent,
        ProductListComponent,
        ProductInformationComponent,
        ProductImageSlideComponent,
        ProductDetailSlideComponent
    ],
    imports: [
        CommonModule,
        ProductManagementRoutingModule,
        NgxSpinnerModule,
        NgbModule,
        MatTabsModule,
        CommonComponentsModule,
        MatDialogModule,
        ReactiveFormsModule
    ]
})
export class ProductManagementModule { }
