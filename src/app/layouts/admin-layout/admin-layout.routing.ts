import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../modules/admin/admin.module').then(m => m.AdminModule),
                data: {
                    moduleName: 'Admin'
                }
            },
            // {
            //     path: 'user-management',
            //     loadChildren: () => import('../../modules/user-management/user-management.module').then(m => m.UserManagementModule),
            //     data: {
            //         moduleName: 'User Management'
            //     }
            // }
        ]
    },
];
