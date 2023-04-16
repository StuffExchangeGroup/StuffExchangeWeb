import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivatePermission } from './common/guards/can-activate-permission';

const routes: Routes = [
    {
        path: '',
        loadChildren:() => import('./layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule),
        data: {
            requireLogin: false
        }
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('../app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
        data: {
            requireLogin: false
        },
        canActivate: [CanActivatePermission]
    },
    {
        path: 'admin',
        loadChildren: () => import('../app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
        data: {
            requireLogin: true
        },
        canActivate: [CanActivatePermission]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
