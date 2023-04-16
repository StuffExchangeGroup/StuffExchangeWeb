import { Router } from '@angular/router';
import { UpdatePassword } from './../../models/IUpdatePassword';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfirmedValidator } from '../../validator/confirmed.validator';

@Component({
    selector: 'app-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
    public changePasswordForm: FormGroup;

    @Input() email!: string;

    constructor(private authService: AuthService,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private toastrService: CustomToastrService,
        private router: Router) {
        this.changePasswordForm = formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            rePassword: ['', [Validators.required, Validators.minLength(6)]],
        }, {
            validators: ConfirmedValidator.passwordMatch('newPassword', 'rePassword')
        })
    }

    ngOnInit(): void {
    }

    get newPassword() {
        return this.changePasswordForm.get('newPassword');
    }

    get rePassword() {
        return this.changePasswordForm.get('rePassword');
    }

    onSubmit() {
        //check invalid form
        this.changePasswordForm.markAllAsTouched();
        if (!this.changePasswordForm.valid) {
            return;
        }
        if (!this.changePasswordForm.dirty) {
            return
        }

        // show loading
        this.spinner.show();
        const updatePasswordReq = new UpdatePassword(this.email, this.newPassword?.value);

        // call api
        this.authService.updatePassword(updatePasswordReq).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastrService.success('Cập nhật thành công', "Mật khẩu của bạn đã được thay đổi thành công")
                }
            },
            error: (e) => {
                console.log(e);
                this.toastrService.error('Thất bại', e.error.errorMessage.message);
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
                this.router.navigateByUrl("/auth/login")
            }
        })
    }
}
