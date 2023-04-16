import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog'


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UserRoutingModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
    ]
})
export class UserModule { }
