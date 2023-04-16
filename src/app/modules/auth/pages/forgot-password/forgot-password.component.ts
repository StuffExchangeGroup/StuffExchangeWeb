import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    email!: string;

    public showForgotForm?: boolean = true;
    public showConfirmForm?: boolean = false;
    public showChangePasswordForm?: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    public submitEmailHandler(email: string) {
        this.email = email;
        this.showForgotForm = false;
        this.showConfirmForm = true;
    }

    public confirmOTPSuccessfullyHandler() {
        this.showConfirmForm = false;
        this.showChangePasswordForm = true;
    }

}
