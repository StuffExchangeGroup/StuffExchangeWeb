import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {ICategoryRes} from '../models/ICategory'

@Injectable({
  providedIn: 'root'
})
export class CategoryManagementService {
    private baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) {}

    public getCategories(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl + 'api/app/categories');
    }
}