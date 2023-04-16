import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileService } from './../../services/profile.service';
import { ChangePassword } from './../../models/IChangePassword';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmedValidator } from '../../validator/confirmed.validator';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    public changePasswordForm: FormGroup;
    public messageError: string | undefined;

    set showUpdateLoading(value: boolean) {
        value ? this.spinner.show() : this.spinner.hide();
    }

    constructor(private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private spinner: NgxSpinnerService,
        private toastr: CustomToastrService) {
        this.changePasswordForm = formBuilder.group({
            oldPassword: ['', [Validators.required, Validators.minLength(6)]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            rePassword: ['', [Validators.required, Validators.minLength(6)]],
        }, {
            validators: ConfirmedValidator.passwordMatch('newPassword', 'rePassword')
        })
    }

    @Output() hideChangePasswordFormEvent = new EventEmitter<void>();

    ngOnInit(): void {
    }

    get oldPassword() {
        return this.changePasswordForm.get('oldPassword');
    }

    get newPassword() {
        return this.changePasswordForm.get('newPassword');
    }

    get rePassword() {
        return this.changePasswordForm.get('rePassword');
    }

    onSave() {
        this.changePasswordForm.markAllAsTouched();

        if (!this.changePasswordForm.valid) {
            return;
        }

        if (!this.changePasswordForm.dirty) {
            return
        }

        this.showUpdateLoading = true;

        const changePasswordReq: ChangePassword = new ChangePassword();
        changePasswordReq.oldPassword = this.oldPassword?.value;
        changePasswordReq.newPassword = this.newPassword?.value;

        this.profileService.changePassword(changePasswordReq).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastr.success("Thay đổi mật khẩu thành công", "");
                    this.changePasswordForm.reset();
                    this.hideChangePasswordFormEvent.emit();
                }
            },
            error: (e) => {
                console.log(e);
                this.messageError = e.error.errorMessage.message;
                this.showUpdateLoading = false;
            },
            complete: () => this.showUpdateLoading = false
        })
    }

    onCancel() {
        this.hideChangePasswordFormEvent.emit();
        this.changePasswordForm.reset();
    }
}
