import { ICategory, ICategoryRes } from './../models/ICategory';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { IDataResponse } from "src/app/common/models/data-response";
import { environment } from "src/environments/environment";
import { IProductResponse } from "../models/IHome";

@Injectable({ providedIn: 'root' })
export class HomeService {

    private baseUrl = environment.baseURl;

    constructor(private router: Router,
        private httpClient: HttpClient) {
    }

    public queryProductNewest(): Observable<IDataResponse<IProductResponse>> {
        return this.httpClient.get<IDataResponse<IProductResponse>>(this.baseUrl + 'api/app/filter-products?page=0&type=NEWEST&size=8');
    }
    public queryProductTrending(): Observable<IDataResponse<IProductResponse>> {
        return this.httpClient.get<IDataResponse<IProductResponse>>(this.baseUrl + 'api/app/filter-products?page=0&type=FAVORITE&size=8');
    }

    public getAllCategories(): Observable<IDataResponse<ICategoryRes>> {
        return this.httpClient.get<IDataResponse<ICategoryRes>>(this.baseUrl + "api/app/categories")
    }
}