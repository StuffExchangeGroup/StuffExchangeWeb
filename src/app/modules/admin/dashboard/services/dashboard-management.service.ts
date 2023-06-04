import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDashboard } from '../models/dashboard';

@Injectable({
    providedIn: 'root'
})
export class DashboardManagementService {
    private baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) { }

    public getDashboardInfo(): Observable<IDashboard> {
        return this.httpClient.get<IDashboard>(this.baseUrl + 'api/dashboard');
    }
}