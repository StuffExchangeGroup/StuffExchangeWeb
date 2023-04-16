
import { ISignUpReq } from './../../models/ISignUpReq';
import { Router } from '@angular/router';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    public messageError!: string | undefined;
    public showLoadingSignUp!: boolean;

    constructor(
        private authService: AuthService,
        private toastr: CustomToastrService,
        private router: Router) {
        this.showLoadingSignUp = false;
    }

    ngOnInit(): void {
    }

    public submitSignUpHandler($event: ISignUpReq): void {
        this.showLoadingSignUp = true;
        this.authService.signUp($event).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.messageError = undefined;
                    this.toastr.success("Đăng kí thành công", TypeNotification.Success);
                    this.router.navigateByUrl('/auth/active',
                        { state: { email: $event.email, password: $event.password } })
                }
            },
            error: (e) => {
                window.console.log("Error");
                this.showLoadingSignUp = false;
                this.messageError = e.error.errorMessage.message;
            },
            complete: () => this.showLoadingSignUp = false
        });
    }

}
