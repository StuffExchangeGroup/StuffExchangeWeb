import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailItemExchangeComponent } from './component/detail-item-exchange/detail-item-exchange.component';

const routes: Routes = [
    {
        path: '',
        component: DetailItemExchangeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExchangeRoutingModule { }
