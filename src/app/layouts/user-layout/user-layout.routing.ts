import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';

export const UserLayoutRoutes: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        loadChildren: () => import('../../modules/user/user.module').then(m => m.UserModule),
    },
];
