import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';

const routes: Routes = [
    {
        path: 'list-user',
        component: ListUserComponent,
    },
    {
        path: 'add-user',
        component: AddUserComponent
    },
    {
        path: 'edit-user/:userId',
        component: EditUserComponent
    },
    {
        path: '**',
        redirectTo: 'list-user'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserManagementRoutingModule { }
