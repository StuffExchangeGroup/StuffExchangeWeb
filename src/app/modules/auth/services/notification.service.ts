import { HttpClient } from '@angular/common/http';
import { IDataResponse } from './../../../common/models/data-response';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {

    private baseUrl = environment.baseURl;
    private token?: string | null;

    constructor(private httpClient: HttpClient) { }

    public addNotificationToken(token: string): Observable<IDataResponse<any>> {
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + "api/app/add-token", { token })
    }

    public deleteNotificationToken(token: string): Observable<IDataResponse<any>> {
        return this.httpClient.delete<IDataResponse<any>>(this.baseUrl + "api/app/delete-token?token=" + token);
    }
}