import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IDataResponse } from "../models/data-response";
import { ICityRes } from "../models/ICity";
import { IProvinceRes } from "../models/IProvince";


@Injectable({ providedIn: 'root' })
export class ProvinceCityService {

    public baseUrl = environment.baseURl;

    constructor(
        private httpClient: HttpClient) {
    }

    public getAllProvinces(): Observable<IDataResponse<IProvinceRes>> {
        return this.httpClient.get<IDataResponse<IProvinceRes>>(this.baseUrl + "api/app/states");
    }

    public getAllCities(): Observable<IDataResponse<ICityRes>> {
        return this.httpClient.get<IDataResponse<ICityRes>>(this.baseUrl + "api/app/cities");
    }

    public getCityByStateId(stateId: number): Observable<IDataResponse<ICityRes>> {
        return this.httpClient.get<IDataResponse<ICityRes>>(this.baseUrl + "api/app/cities?stateId=" + stateId);
    }
}