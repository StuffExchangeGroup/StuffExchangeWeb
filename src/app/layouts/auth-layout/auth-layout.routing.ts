import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule),
    },
];
