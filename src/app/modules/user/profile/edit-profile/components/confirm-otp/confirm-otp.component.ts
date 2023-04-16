import { Profile } from './../../models/IProfile';
import { ConfirmOTP } from './../../models/IConfirmOTP';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../../../../auth/models/IUser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';

@Component({
    selector: 'app-confirm-otp',
    templateUrl: './confirm-otp.component.html',
    styleUrls: ['./confirm-otp.component.scss']
})
export class ConfirmOtpComponent implements OnInit {

    @Input() email!: string;
    @Input() user!: User;

    @Output() hideConfirmOTPFormEvent = new EventEmitter<void>();
    @Output() updateUserEvent = new EventEmitter<User>();

    public confirmForm!: FormGroup;
    public messageError: string | undefined;

    set showLoadingUpdate(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide();
    }

    constructor(private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private profileService: ProfileService,
        private toastr: CustomToastrService) {
        this.confirmForm = formBuilder.group({
            otp: ['', [Validators.required, Validators.pattern("[0-9]{4}")]]
        })
    }

    ngOnInit(): void {
    }

    get otp() {
        return this.confirmForm.get('otp');
    }

    onConfirm() {
        this.confirmForm.markAllAsTouched();
        if (!this.confirmForm.valid) {
            return;
        }
        if (!this.confirmForm.dirty) {
            return;
        }

        this.showLoadingUpdate = true;
        const confirmOTPReq = new ConfirmOTP(this.user.email, this.otp?.value);

        this.profileService.confirmOTP(confirmOTPReq).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.messageError = undefined;
                    this.updateEmail();
                }
            },
            error: (e) => {
                this.messageError = e.error.errorMessage.message;
            }
        })
    }

    onCancel() {
        this.hideConfirmOTPFormEvent.emit();
        this.confirmForm.reset();
    }

    public onResendOTP(): void {
        this.showLoadingUpdate = true;
        this.profileService.resendOTPConfirm(this.user.email, this.email).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.messageError = undefined;
                    this.toastr.success("Đã gửi mã OTP đến email của bạn", "");
                }
            },
            error: (e) => {
                this.showLoadingUpdate = false;
                this.messageError = e.error.errorMessage.message;
            },
            complete: () => this.showLoadingUpdate = false
        })
    }

    public updateEmail() {
        const profile: Profile = new Profile();
        profile.email = this.email;
        this.showLoadingUpdate = true;

        this.profileService.partialUpdateProfile(profile).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.user.email = this.email;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    this.updateUserEvent.emit(this.user);

                    this.toastr.success("Xác thực tài khoản thành công", TypeNotification.Success);
                    this.hideConfirmOTPFormEvent.emit();
                }
            },
            error: (e) => {
                this.showLoadingUpdate = false;
                this.messageError = e.error.errorMessage.message;
            },
            complete: () => this.showLoadingUpdate = false
        })

    }
}
