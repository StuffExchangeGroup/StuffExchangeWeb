import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivatePermission } from 'src/app/common/guards/can-activate-permission';
import { ExchangeLayoutComponent } from './exchange/page/exchange-layout/exchange-layout.component';
import { ProfileLayoutComponent } from './profile/profile-layout.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'products',
        loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule),
    },
    {
        path: 'products/:id',
        loadChildren: () => import('./detail-product/detail-product.module').then(m => m.DetailProductModule),
    },
    {
        path: 'profile',
        component: ProfileLayoutComponent,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        data: {
            requireLogin: true
        },
        canActivate: [CanActivatePermission]
    },
    {
        path: 'my-exchanges',
        component: ExchangeLayoutComponent,
        loadChildren: () => import('./exchange/exchange.module').then(m => m.ExchangeModule),
        data: {
            requireLogin: true
        },
        canActivate: [CanActivatePermission]
    },
    {
        path: 'my-exchanges/:id',
        component: ExchangeLayoutComponent,
        loadChildren: () => import('./exchange/exchange.module').then(m => m.ExchangeModule),
        data: {
            requireLogin: true
        },
        canActivate: [CanActivatePermission]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule {

}
