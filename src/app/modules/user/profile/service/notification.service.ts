import { IDataResponse } from './../../../../common/models/data-response';
import { Observable } from 'rxjs/internal/Observable';
import { INotification, INotificationRes } from './../models/INotification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    public baseUrl: string = environment.baseURl;

    constructor(private httpClient: HttpClient) {
    }

    public getAllNotifications(): Observable<IDataResponse<any>> {
        return this.httpClient.get<IDataResponse<any>>(this.baseUrl + 'api/app/list-notifications');
    }

    public getNotificationById(notificationId: number): Observable<IDataResponse<any>> {
        return this.httpClient.get<IDataResponse<any>>(this.baseUrl + 'api/app/notification?id=' + notificationId.toString());
    }

    public markAllNotificationAsRead(): Observable<IDataResponse<any>> {
        return this.httpClient.put<IDataResponse<any>>(this.baseUrl + 'api/app/notification/mark-all', {});
    }
}   