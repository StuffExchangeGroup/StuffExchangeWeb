import { NotificationListComponent } from './notification-list/notification-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishListComponent } from './wish-list/wish-list.component';

const routes: Routes = [
    {
        path: 'edit',
        loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule)
    },
    {
        path: 'wish-list',
        component: WishListComponent
    },
    {
        path: 'product',
        loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule)
    },
    {
        path: 'notification',
        component: NotificationListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
