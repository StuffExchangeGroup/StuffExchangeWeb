import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UpdateEmailComponent } from './components/update-email/update-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { UpdateInformationComponent } from './components/update-information/update-information.component';
import { ShowContactComponent } from './components/show-contact/show-contact.component';
import { UpdatePhoneComponent } from './components/update-phone/update-phone.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        EditProfileComponent,
        UpdateEmailComponent,
        ChangePasswordComponent,
        ConfirmOtpComponent,
        UpdateInformationComponent,
        ShowContactComponent,
        UpdatePhoneComponent
    ],
    imports: [
        CommonModule,
        EditProfileRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        BsDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ]
})
export class EditProfileModule { }
