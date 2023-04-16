import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeLayoutComponent } from './page/exchange-layout/exchange-layout.component';
import { DetailItemExchangeComponent } from './component/detail-item-exchange/detail-item-exchange.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyExchangeComponent } from './component/my-exchange/my-exchange.component';
import { ChattingComponent } from './component/chatting/chatting.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChattingListComponent } from './component/chatting-list/chatting-list.component';
import { ChattingLayoutComponent } from './page/chatting-layout/chatting-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ExchangeLayoutComponent,
        MyExchangeComponent,
        DetailItemExchangeComponent,
        ChattingComponent,
        ChattingListComponent,
        ChattingLayoutComponent,
    ],
    imports: [
        NgxSpinnerModule,
        MatTabsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ]
})
export class ExchangeModule { }
