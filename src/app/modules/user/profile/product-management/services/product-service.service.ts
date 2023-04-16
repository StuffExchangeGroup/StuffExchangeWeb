import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Status } from "src/app/common/enum/status-product";
import { IDataResponse } from "src/app/common/models/data-response";
import { environment } from "src/environments/environment";
import { IMyItems } from "../models/IMyItem";
import { IProductDetailRes } from "../models/IProductDetail";
import { IProductSimilar } from "../models/ISimilarProduct";

@Injectable({ providedIn: 'root' })
export class ProductService {

    private baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) {
    }

    public queryMyItem(productStatus: Status): Observable<IDataResponse<IMyItems>> {
        let productStatusParam = new HttpParams();
        productStatusParam = productStatusParam.append("status", productStatus);
        return this.httpClient.get<IDataResponse<IMyItems>>(this.baseUrl + 'api/app/products/my-items', { params: productStatusParam });
    }

    public querySimilarProduct(productId: number): Observable<IDataResponse<IProductSimilar>> {
        return this.httpClient.get<IDataResponse<IProductSimilar>>(this.baseUrl + 'api/app/products/similar/' + productId);
    }

    public queryDetailProduct(productId: number): Observable<IDataResponse<IProductDetailRes>> {
        return this.httpClient.get<IDataResponse<IProductDetailRes>>(this.baseUrl + 'api/app/my-products/' + productId);
    }
}