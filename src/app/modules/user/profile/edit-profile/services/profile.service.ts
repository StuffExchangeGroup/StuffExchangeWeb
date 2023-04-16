import { ChangePassword } from './../models/IChangePassword';
import { ConfirmOTP } from './../models/IConfirmOTP';
import { IDataResponse } from './../../../../../common/models/data-response';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/IProfile';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/common/services/auth.service';
import { IAvatarRes } from '../../models/IAvatar';
import { IUser } from 'src/app/modules/auth/models/IUser';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    public baseUrl: string = environment.baseURl;

    constructor(
        private httpBackend: HttpBackend,
        private httpClient: HttpClient,
        private authService: AuthService) {
    }

    public partialUpdateProfile(profile: Profile): Observable<IDataResponse<IUser>> {
        const body = JSON.stringify(profile);
        return this.httpClient.put<IDataResponse<IUser>>(this.baseUrl + 'api/app/profiles', body);
    }

    public partialUpdateAvatarProfile(profile: Profile): Observable<IDataResponse<any>> {
        const body = JSON.stringify(profile);
        return this.httpClient.put<IDataResponse<IUser>>(this.baseUrl + 'api/app/profiles', body);
    }

    public upLoadAvatar(newAvatarForm: FormData): Observable<IDataResponse<IAvatarRes>> {
        const httpClient = new HttpClient(this.httpBackend);

        const access_token = this.authService.getToken
        const headers = new HttpHeaders()
            .append(
                'Authorization',
                'Bearer ' + access_token
            )
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
            .append('Access-Control-Allow-Headers', ' X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type')

        return httpClient.post<IDataResponse<IAvatarRes>>(this.baseUrl + 'api/app/profiles/uploadAvatar', newAvatarForm, { 'headers': headers });
    }

    public checkExistEmail(email: string) {
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/check-exist-email?email=' + email, {});
    }

    public resendOTPConfirm(oldEmail: string | undefined, newEmail: string | undefined): Observable<IDataResponse<any>> {
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/resend-otp-update-email', { oldEmail, newEmail });
    }

    public confirmOTP(confirmOTP: ConfirmOTP): Observable<IDataResponse<any>> {
        const body = JSON.stringify(confirmOTP);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/auth/check-otp', body);
    }

    public changePassword(changePasswordReq: ChangePassword): Observable<IDataResponse<any>> {
        const body = JSON.stringify(changePasswordReq);
        return this.httpClient.put<IDataResponse<any>>(this.baseUrl + 'api/app/auth/change-password', body);
    }
}