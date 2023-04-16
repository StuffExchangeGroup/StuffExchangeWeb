
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { IDataResponse } from "src/app/common/models/data-response";
import { environment } from "src/environments/environment";
// import { IDataResponse } from "src/app/common/models/data-response";
// import { environment } from "src/environments/environment";
import { IProductDetailRes } from "../models/IProductDetail";
import { IProductSimilar } from "../models/ISimilarProduct";

@Injectable({ providedIn: 'root' })
export class DetailProductService {

    private baseUrlFake = environment.baseURlFake;
    private baseUrl = environment.baseURl;

    constructor(private router: Router,
        private httpClient: HttpClient) {
    }

    public querySimilarProduct(productId: number): Observable<IDataResponse<IProductSimilar>> {
        return this.httpClient.get<IDataResponse<IProductSimilar>>(this.baseUrl + 'api/app/products/similar/' + productId);
    }

    public queryDetailProduct(productId: number): Observable<IDataResponse<IProductDetailRes>> {
        return this.httpClient.get<IDataResponse<IProductDetailRes>>(this.baseUrl + 'api/app/my-products/' + productId);
    }
}