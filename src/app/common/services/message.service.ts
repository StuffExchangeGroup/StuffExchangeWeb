import { environment } from './../../../environments/environment';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from 'src/app/modules/auth/services/notification.service';
@Injectable({ providedIn: 'root' })
export class MessagingService {
    currentMessage = new BehaviorSubject(null);
    private token?: string | null;

    constructor(private angularFirebaseMessaging: AngularFireMessaging,
        private notificationService: NotificationService) {
    }

    requestToken(): void {
        this.angularFirebaseMessaging.requestToken.subscribe({
            next: (token) => {
                if (token) {
                    this.notificationService.addNotificationToken(token).subscribe({
                        next: (res) => {
                            if (res.isSuccess) {
                                localStorage.setItem("device_token", token);
                            }
                        }
                    })
                } else {
                    this.token = null;
                }
            },
            error: (err) => {
                this.token = null;
            }
        })
    }

    receiveMessage() {

    }
}