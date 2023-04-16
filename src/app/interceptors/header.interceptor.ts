import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { AuthService } from '../common/services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const access_token = this.authService.getToken
        request = request.clone({
            headers: request.headers
                .append(
                    'Authorization',
                    'Bearer ' + access_token
                )
                .append('Access-Control-Allow-Origin', '*')
                .append('content-type', 'application/json')
                .append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
                .append('Access-Control-Allow-Headers', ' X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type')
        });

        return next.handle(request);
    }
}