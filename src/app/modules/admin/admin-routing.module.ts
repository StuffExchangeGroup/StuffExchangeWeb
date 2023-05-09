import { UserManagementModule } from './user-management/user-management.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
            moduleName: 'Dashboard'
        },
    },
    {
        path: 'user-management',
        loadChildren: () => import('../../modules/admin/user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
            moduleName: 'UserManagement'
        },
    },
    {
        path: 'category-management',
        loadChildren: () => import('../../modules/admin/category-management/category-management.module').then(m => m.CategoryManagementModule),
        data: {
            moduleName: 'CategoryManagement'
        },
    },
    {
        path: 'product-management',
        loadChildren: () => import('../../modules/admin/product-management/product-management.module').then(m => m.ProductManagementModule),
        data: {
            moduleName: 'ProductManagement'
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
