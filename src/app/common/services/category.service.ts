import { IDataResponse } from './../models/data-response';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ICategoryRes } from '../models/ICategory';

@Injectable({ providedIn: 'root' })
export class CategoryService {
    public baseUrl = environment.baseURl;

    constructor(
        private httpClient: HttpClient) {
    }

    public getAll(): Observable<IDataResponse<ICategoryRes>> {
        return this.httpClient.get<IDataResponse<ICategoryRes>>(this.baseUrl + "api/app/categories");
    }
}
