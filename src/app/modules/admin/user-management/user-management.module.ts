import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListUserComponent,
    EditUserComponent,
    AddUserComponent,
    UserTableComponent,
    AddUserFormComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserManagementModule { }
