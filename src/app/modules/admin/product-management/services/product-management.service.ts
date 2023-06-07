import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRes } from '../models/IProduct'

@Injectable({
    providedIn: 'root'
})
export class ProductManagementService {
    private baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) { }

    public getProducts(status: any): Observable<any> {
        return this.httpClient.get<any>(this.baseUrl + `api/products?size=1000${status === 'null' ? '' : `&status=${status}`}`);
    }

    public blockProduct(productId: number): Observable<any> {
        return this.httpClient.put<any>(this.baseUrl + `api/products/block/${productId}`, {});
    }
}