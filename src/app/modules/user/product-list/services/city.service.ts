import { ICity, ICityRes } from './../models/ICity';
import { IDataResponse } from './../../../../common/models/data-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CityService {
    public baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) {
    }

    public getAll(): Observable<IDataResponse<ICityRes>> {
        return this.httpClient.get<IDataResponse<ICityRes>>(this.baseUrl + "api/app/cities");
    }
}