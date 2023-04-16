import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationAction } from '../../enum/notification-action';
import { NotificationContent } from '../../models/popup-notification-content';

@Component({
    selector: 'app-popup-notification',
    templateUrl: './popup-notification.component.html',
    styleUrls: ['./popup-notification.component.scss']
})
export class PopupNotificationComponent implements OnInit {

    public notification: NotificationContent;
    constructor(
        private popupNotification: MatDialogRef<PopupNotificationComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) private notificationContent: NotificationContent
    ) {
        this.notification = notificationContent
    }

    ngOnInit(): void {
    }

    onAccept() {
        this.popupNotification.close({ event: NotificationAction.ACCEPT });
    }

    onCancel() {
        this.popupNotification.close({ event: NotificationAction.CANCEL });
    }

}
