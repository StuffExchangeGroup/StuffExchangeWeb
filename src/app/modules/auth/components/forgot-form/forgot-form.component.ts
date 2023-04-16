import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-forgot-form',
    templateUrl: './forgot-form.component.html',
    styleUrls: ['./forgot-form.component.scss']
})
export class ForgotFormComponent implements OnInit {

    public forgotForm: FormGroup;

    @Output() submitEmailEvent = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private authService: AuthService,
        private toastrService: CustomToastrService) {
        this.forgotForm = formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        })
    }

    ngOnInit(): void {
        this.spinner.hide();
    }

    get email() {
        return this.forgotForm.get('email')
    }

    public onSubmit() {
        //check invalid form
        this.forgotForm.markAllAsTouched();
        if (!this.forgotForm.valid) {
            return;
        }
        if (!this.forgotForm.dirty) {
            return
        }

        //show loading
        this.spinner.show();

        //send otp
        const email: string = this.email?.value;
        this.authService.resendOTPConfirm(email).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastrService.success("Thành công", "Mã OTP đã được gửi đến email của bạn");
                }
            },
            error: (e) => {
                const errorMessage: string = e.error.errorMessage.message;
                if (errorMessage === "User not found.")
                    this.toastrService.error("Thất bại", "Không tìm thấy người dùng với email được cung cấp");
                else {
                    this.toastrService.error("Thất bại", errorMessage);
                }
                this.spinner.hide();
                return;
            },
            complete: () => {
                this.spinner.hide();
                this.submitEmailEvent.emit(this.email?.value)
            }
        })
    }

}
