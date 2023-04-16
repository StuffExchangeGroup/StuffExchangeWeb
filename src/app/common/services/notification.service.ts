import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IDataResponse } from '../models/data-response';
import { environment } from 'src/environments/environment';
import { IMessageNotification } from '../models/message-notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    private baseUrl = environment.baseURl;
    private token?: string | null;

    constructor(private httpClient: HttpClient) { }

    public countUnseenNotification(): Observable<IDataResponse<any>> {
        return this.httpClient.get<IDataResponse<any>>(this.baseUrl + "api/app/notification/count");
    }

    public pushMessageNotification(notificationMessage: IMessageNotification): Observable<IDataResponse<any>> {
        const messagesBody = JSON.stringify(notificationMessage);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + "api/app/push-notification/chat-swap", messagesBody);
    }
}