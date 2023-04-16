import { IDataResponse, IResult } from './../models/data-response';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FavouriteService {
    public baseUrl = environment.baseURl;

    constructor(
        private authSerivce: AuthService,
        private httpClient: HttpClient,
        private router: Router,) {
    }

    public favouriteProduct(productId: number): Observable<IDataResponse<IResult>> {
        if (!this.authSerivce.isLoggedIn) {
            this.router.navigate(['/auth/login']);
            return new Observable;
        }
        return this.httpClient.post<IDataResponse<IResult>>(this.baseUrl + "api/app/favorites/?productId=" + productId, null);
    }
}
