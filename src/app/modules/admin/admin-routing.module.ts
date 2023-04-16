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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
