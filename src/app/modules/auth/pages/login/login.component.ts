import { NotificationService } from './../../services/notification.service';
import { MessagingService } from './../../../../common/services/message.service';
import { Component, OnInit } from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { AuthService } from 'src/app/common/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseDestroyableDirective implements OnInit {
    public messageError!: string;
    public showLoadingLogin!: boolean;

    constructor(private authService: AuthService,
        private toastrService: CustomToastrService,
        private messagingService: MessagingService,
        private notificationService: NotificationService) {
        super();
        this.showLoadingLogin = false;
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    public submitLogin($event: any): void {
        this.showLoadingLogin = true;
        this.authService
            .login($event.username, $event.password)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result.isSuccess) {
                        this.messagingService.requestToken();
                        this.toastrService.success('Đăng nhập thành công', '');
                        // this.toastr.success('Login success', TypeNotification.Success);
                    }
                },
                error: (e) => {
                    this.showLoadingLogin = false
                    this.messageError = e.error.errorMessage.message
                },
                complete: () => {
                    this.showLoadingLogin = false;
                }
            });
    }
}
