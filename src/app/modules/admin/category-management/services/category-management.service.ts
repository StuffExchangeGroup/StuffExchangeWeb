import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory, ICategoryRes } from '../models/ICategory'

@Injectable({
    providedIn: 'root'
})
export class CategoryManagementService {
    private baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) { }

    public getCategories(): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl + 'api/app/categories');
    }

    public getCategoryById(userId: string): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl + 'api/categories/' + userId);
    }

    public editCategory(category: ICategory): Observable<any> {
        return this.httpClient.put<any>(this.baseUrl + 'api/categories', { categories: category });
    }

    public addCategory(category: ICategory): Observable<any> {
        return this.httpClient.post<any>(this.baseUrl + 'api/categories', { categories: category });
    }

    public deleteCategory(userId: string): Observable<any> {
        return this.httpClient.delete<any>(this.baseUrl + 'api/categories/' + userId);
    }
}