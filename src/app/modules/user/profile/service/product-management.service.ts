import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Status } from "src/app/common/enum/status-product";
import { IDataResponse } from "src/app/common/models/data-response";
import { AuthService } from "src/app/common/services/auth.service";
import { environment } from "src/environments/environment";
import { IMyProductRes } from "../models/IProductManagement";

@Injectable({ providedIn: 'root' })
export class ProductManagementService {
    public baseUrl = environment.baseURl;

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private router: Router,) {
    }
    public getMyProducts(productStatus: Status): Observable<IDataResponse<IMyProductRes>> {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/auth/login']);
            return new Observable;
        }
        let statusHttpParams = new HttpParams();
        if (productStatus !== Status.ALL) {
            statusHttpParams = statusHttpParams.append('status', productStatus);
        }
        return this.httpClient.get<IDataResponse<IMyProductRes>>(this.baseUrl + "api/app/products/my-items", { params: statusHttpParams });

    }

    public deleteMyItemById(productId: number): Observable<IDataResponse<any>> {
        return this.httpClient.delete<IDataResponse<any>>(this.baseUrl + 'api/app/products/' + productId);
    }
}
