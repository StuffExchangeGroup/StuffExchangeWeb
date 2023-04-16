import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from './../../services/profile.service';
import { Profile } from './../../models/IProfile';
import { User } from './../../../../../auth/models/IUser';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    isContactShowing: boolean = true;
    isUpdatePhoneShowing: boolean = false;
    isUpdateEmailShowing: boolean = false;
    isConfirmOTPShowing: boolean = false;
    isChangePasswordShowing: boolean = false;

    public user!: User;
    public tempEmail!: string;

    set showLoadingUpdate(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide();
    }

    constructor(private authService: AuthService,
        private profileService: ProfileService,
        private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.user = this.authService.getUser;
    }

    updateContactHandler(str: string) {
        this.isContactShowing = false;
        if (str === 'update-phone') {
            this.isUpdatePhoneShowing = true;
        } else if (str === 'update-email') {
            this.isUpdateEmailShowing = true;
        } else {
            this.isChangePasswordShowing = true;
        }
    }

    showConfirmOTPFormHandler(email: string) {
        this.isUpdateEmailShowing = false;
        this.isConfirmOTPShowing = true;
        this.tempEmail = email;
    }

    hideConfirmOTPFormHandler() {
        this.isContactShowing = true;
        this.isConfirmOTPShowing = false;
    }

    hideUpdatePhoneFormHandler() {
        this.isContactShowing = true;
        this.isUpdatePhoneShowing = false;
    }

    hideUpdateEmailFormHandler() {
        this.isContactShowing = true;
        this.isUpdateEmailShowing = false;
    }

    hideChangePasswordFormHandler() {
        this.isContactShowing = true;
        this.isChangePasswordShowing = false;
    }

    updateUserHandler(user: User) {
        this.user = user;

    }
}
