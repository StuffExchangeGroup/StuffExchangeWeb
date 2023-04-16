import { ConfirmOTP } from './../../../user/profile/edit-profile/models/IConfirmOTP';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { hide } from '@popperjs/core';

@Component({
    selector: 'app-confirm-email-form',
    templateUrl: './confirm-email-form.component.html',
    styleUrls: ['./confirm-email-form.component.scss']
})
export class ConfirmEmailFormComponent implements OnInit {

    public confirmForm: FormGroup;

    @Input() email!: string;

    @Output() confirmOTPSuccessfullyEvent = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
        private authService: AuthService,
        private toastrService: CustomToastrService) {
        this.confirmForm = formBuilder.group({
            otp: ['', [Validators.required, Validators.pattern("[0-9]{4}")]]
        })
    }

    ngOnInit(): void {
        this.spinner.hide();
    }

    get otp() {
        return this.confirmForm.get('otp')
    }

    onSubmit() {
        //check invalid form
        this.confirmForm.markAllAsTouched();
        if (!this.confirmForm.valid) {
            return;
        }
        if (!this.confirmForm.dirty) {
            return
        }

        // show loading
        this.spinner.show();
        const confirmOTPReq = new ConfirmOTP(this.email, this.otp?.value);

        // call api
        this.authService.confirmOTP(confirmOTPReq).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastrService.success("Xác thực thành công", 'Mã OTP hợp lệ');
                    this.confirmOTPSuccessfullyEvent.emit();
                }
            },
            error: (e) => {
                const errorMessage: string = e.error.errorMessage.message;
                this.toastrService.error("Thất bại", errorMessage);
                this.spinner.hide();
                return;
            },
            complete: () => {
                this.spinner.hide();
            }
        })
    }

    onResendOTP() {
        this.spinner.show();
        this.authService.resendOTPConfirm(this.email).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.toastrService.success("Thành công", "Mã OTP đã được gửi đến email của bạn");
                }
            },
            error: (e) => {
                const errorMessage: string = e.error.errorMessage.message;
                this.toastrService.error("Thất bại", errorMessage);
                this.spinner.hide();
                return;
            },
            complete: () => {
                this.spinner.hide();
            }
        })
    }
}
