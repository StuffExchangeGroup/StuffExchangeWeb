import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProductRoutingModule } from './detail-product-routing.module';
import { DetailProductComponent } from './page/detail-product/detail-product.component';
import { SimilarProductComponent } from './components/similar-product/similar-product.component';
import { InformationProductComponent } from './components/information-product/information-product.component';
import { DescriptionProductComponent } from './components/description-product/description-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlideDetailComponent } from './components/slide-detail/slide-detail.component';

import { MatTabsModule } from '@angular/material/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonComponentsModule } from 'src/app/common/components/components.module';
import { PopupSwapComponent } from './components/popup-swap/popup-swap.component';
import { MatDialogModule } from '@angular/material/dialog'
@NgModule({
    declarations: [
        DetailProductComponent,
        SimilarProductComponent,
        InformationProductComponent,
        DescriptionProductComponent,
        SlideDetailComponent,
        PopupSwapComponent,
    ],
    imports: [
        CommonModule,
        DetailProductRoutingModule,
        NgbModule,
        MatTabsModule,
        NgxSpinnerModule,
        CommonComponentsModule,
        MatDialogModule
    ]
})
export class DetailProductModule { }
export class MaterialModule { }