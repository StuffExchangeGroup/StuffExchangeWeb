import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { INotification } from './../models/INotification';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
    selector: 'app-notification-list',
    templateUrl: './notification-list.component.html',
    styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

    public notifications?: INotification[]

    constructor(private notificationService: NotificationService,
        private spinner: NgxSpinnerService,
        private router: Router) { }

    ngOnInit(): void {
        this.getAllNotification()
    }

    public getAllNotification(): void {
        this.spinner.show();
        this.notificationService.getAllNotifications().subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.notifications = res.data?.notification.list;
                }
            },
            error: (e) => {
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        })
    }

    public convertDate(date: Date) {
        const createdDate = new Date(date);
        const today = new Date();

        const diffMs: any = today.getTime() - createdDate.getTime();
        const diffDays = Math.floor(diffMs / 86400000);
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

        if (diffDays < 10 && diffDays > 0) {
            return diffDays + ' ngày trước'
        }

        if (diffHrs < 24 && diffHrs > 0) {
            return diffHrs + ' giờ trước';
        }

        if (diffMins < 60 && diffMins >= 0) {
            return diffMins + ' phúc trước';
        }

        return createdDate.getDate() + '/' + (createdDate.getMonth() + 1) + '/' + createdDate.getFullYear();
    }

    public redirectToExchange(notificationId: number, productId: number) {
        this.notificationService.getNotificationById(notificationId).subscribe();
        this.router.navigateByUrl('/my-exchanges/' + productId);
    }

    public markAllAsRead(): void {
        this.spinner.show();
        this.notificationService.markAllNotificationAsRead().subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.getAllNotification();
                }
            },
            error: (e) => {
                alert("Đã xảy ra lỗi! Vui lòng thử lại sau");
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        })
    }
}
