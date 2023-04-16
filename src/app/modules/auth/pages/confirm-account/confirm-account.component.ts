import { IConfirmOTPRes } from './../../models/IConfirmOTPRes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IConfirmOTPReq } from '../../models/IConfirmOTPReq';
import { AuthService } from '../../services/auth.service';
import { TypeNotification } from 'src/app/common/enum/type-notification';

@Component({
    selector: 'app-confirm-account',
    templateUrl: './confirm-account.component.html',
    styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
    public messageError!: string | undefined;
    public showLoadingConfirm!: boolean;
    public confirmOTPReq!: IConfirmOTPReq;
    public confirmOTPRes!: IConfirmOTPRes;

    constructor(private authService: AuthService,
        private toastr: ToastrService,
        private router: Router) {
        this.showLoadingConfirm = false;
    }

    ngOnInit(): void {
        this.confirmOTPReq = history.state;
    }

    public submitConfirmAccountHandler($event: number): void {
        this.showLoadingConfirm = true;
        this.confirmOTPReq.codeOTP = $event.toString()

        this.authService.checkOTPConfirm(this.confirmOTPReq).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.confirmOTPRes = res.data;
                    this.messageError = undefined;
                    this.toastr.success("Xác thực tài khoản thành công", TypeNotification.Success);
                    this.authService.confirmSuccessHandler(this.confirmOTPRes);
                }
            },
            error: (e) => {
                this.showLoadingConfirm = false;
                this.messageError = e.error.errorMessage.message;
            },
            complete: () => this.showLoadingConfirm = false
        })
    }

    public submitResendOTPHandler(): void {
        this.showLoadingConfirm = true;
        this.authService.resendOTPConfirm(this.confirmOTPReq.email).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.messageError = undefined;
                    this.toastr.success("Đã gửi mã OTP đến email của bạn", TypeNotification.Success);
                }
            },
            error: (e) => {
                this.showLoadingConfirm = false;
                this.messageError = e.error.errorMessage.message;
            },
            complete: () => this.showLoadingConfirm = false
        })
    }

}
