import { IFilterProductRes } from './../models/IProduct';
import { IDataResponse } from 'src/app/common/models/data-response';
import { Observable } from 'rxjs/internal/Observable';
import { Filter } from './../models/IFilter';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductReq } from '../../profile/models/IPostProduct';
import { IProductDetailRes } from '../../detail-product/models/IProductDetail';

@Injectable({ providedIn: 'root' })
export class ProductService {
    public baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) {
    }

    public filterProduct(filter: Filter): Observable<IDataResponse<any>> {
        let params = new HttpParams();
        params = params.set('page', filter.page - 1);
        params = params.set('size', filter.size);
        if (filter.categoryIds != null) {
            params = params.set('categoryIds', filter.categoryIds.toString());
        }
        if (filter.cityIds != null) {
            params = params.set('cityIds', filter.cityIds.toString());
        }
        if (filter.conditions != null) {
            params = params.set('conditions', filter.conditions.toString());
        }
        if (filter.purposeTypes != null) {
            params = params.set('purposeTypes', filter.purposeTypes.toString());
        }
        if (filter.search != null) {
            params = params.set('search', filter.search);
        }
        if (filter.type != null) {
            params = params.set('type', filter.type);
        }
        return this.httpClient.get<IDataResponse<any>>(this.baseUrl + "api/app/web-filter-products", { params })
    }

    public postProduct(productReq: ProductReq): Observable<IDataResponse<IProductDetailRes>> {

        const postProductBody = JSON.stringify(productReq);
        return this.httpClient.post<IDataResponse<IProductDetailRes>>(this.baseUrl + 'api/app/products', postProductBody);
    }
    public putProduct(productReq: ProductReq): Observable<IDataResponse<IProductDetailRes>> {

        const putProductBody = JSON.stringify(productReq);
        return this.httpClient.put<IDataResponse<IProductDetailRes>>(this.baseUrl + 'api/app/products', putProductBody);
    }
}