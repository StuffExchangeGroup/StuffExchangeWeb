import { ConfirmFormComponent } from './components/confirm-form/confirm-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ConfirmAccountComponent } from './pages/confirm-account/confirm-account.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ConfirmEmailFormComponent } from './components/confirm-email-form/confirm-email-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { ForgotFormComponent } from './components/forgot-form/forgot-form.component';

@NgModule({
    declarations: [
        LoginComponent,
        LoginFormComponent,
        SignupComponent,
        SignupFormComponent,
        ConfirmAccountComponent,
        ConfirmFormComponent,
        ForgotPasswordComponent,
        ConfirmEmailFormComponent,
        ChangePasswordFormComponent,
        ForgotFormComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ],
    providers: [
        AuthService,
    ],
})
export class AuthModule { }
