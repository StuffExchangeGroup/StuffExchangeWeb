import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { IDataResponse } from 'src/app/common/models/data-response';
import { IWishLists } from '../models/IWishList';

@Injectable({ providedIn: 'root' })
export class WishListService {
    public baseUrl = environment.baseURl;

    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private router: Router,) {
    }

    public getWishList(): Observable<IDataResponse<IWishLists>> {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['/auth/login']);
            return new Observable;
        }
        return this.httpClient.get<IDataResponse<IWishLists>>(this.baseUrl + "api/app/my-wishlist");
    }

}
