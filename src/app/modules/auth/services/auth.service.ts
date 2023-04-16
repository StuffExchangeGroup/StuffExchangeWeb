import { UpdatePassword } from './../models/IUpdatePassword';
import { IConfirmOTPRes } from './../models/IConfirmOTPRes';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ISignUpReq } from '../models/ISignUpReq';
import { IDataResponse } from 'src/app/common/models/data-response';
import { ConfirmOTP, IConfirmOTPReq } from '../models/IConfirmOTPReq';

@Injectable({ providedIn: 'root' })
export class AuthService {

    public baseUrl: string = environment.baseURl;

    constructor(
        private router: Router,
        private httpClient: HttpClient
    ) { }

    public signUp(signUpReq: ISignUpReq): Observable<IDataResponse<any>> {
        if (signUpReq.phone === '') {
            signUpReq.phone = null;
        }
        const body = JSON.stringify(signUpReq);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/auth/sign-up', body);
    }

    public checkOTPConfirm(confirmOTPReq: IConfirmOTPReq): Observable<IDataResponse<IConfirmOTPRes>> {
        const body = JSON.stringify(confirmOTPReq);
        return this.httpClient.post<IDataResponse<IConfirmOTPRes>>(this.baseUrl + 'api/app/auth/check-otp-sign-up', body);
    }

    public confirmSuccessHandler(confirmOTPRes: IConfirmOTPRes): void {
        localStorage.setItem('access_token', JSON.stringify(confirmOTPRes.signIn.authToken));
        this.router.navigate(['/admin']);
    }

    public resendOTPConfirm(email: string | undefined): Observable<IDataResponse<any>> {
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/auth/resend-otp', { email });
    }

    public confirmOTP(confirmOTP: ConfirmOTP): Observable<IDataResponse<any>> {
        const body = JSON.stringify(confirmOTP);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/auth/check-otp', body);
    }
    public updatePassword(updatePassword: UpdatePassword): Observable<IDataResponse<any>> {
        const body = JSON.stringify(updatePassword);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/auth/update-password', body);
    }

}