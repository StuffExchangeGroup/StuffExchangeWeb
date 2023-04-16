import { NotificationService } from 'src/app/modules/auth/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ISignInResponse } from 'src/app/modules/auth/models/ISignInRes';
import { IUser, User } from 'src/app/modules/auth/models/IUser';
import { environment } from 'src/environments/environment';
// import { IUser, IUserLoginResponse } from '../models/user-login-model';
import { IDataResponse } from '../models/data-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public userSubject = new Subject<IUser>();
    public user?: IUser;
    public signInResponse?: ISignInResponse;

    private baseUrlFake = environment.baseURlFake;
    private baseUrl = environment.baseURl;

    constructor(private router: Router,
        private httpClient: HttpClient,
        private notificationService: NotificationService) {
    }

    public get isLoggedIn(): boolean {
        this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : undefined;
        return this.user != undefined;
    }

    public get getToken(): string {
        let access_token = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token') || '') : undefined;
        return access_token;
    }

    public get getUser(): IUser {
        let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : undefined;
        return user;
    }

    public login(username: string, password: string): Observable<IDataResponse<ISignInResponse>> {
        return this.httpClient.post<IDataResponse<ISignInResponse>>(this.baseUrl + 'api/app/auth/sign-in', { username, password }).pipe(
            tap((result: IDataResponse<ISignInResponse>) => {
                if (result.isSuccess) {
                    this.handleLogin(result.data);
                } else {
                    console.log(result)
                }
            })
        );
    }

    public logout(): void {
        //remove device token
        const deviceToken = localStorage.getItem('device_token');
        if (deviceToken) {
            this.notificationService.deleteNotificationToken(deviceToken).subscribe({
                next: (res) => {
                    if (res.isSuccess) {
                        localStorage.removeItem('device_token');
                    }
                }
            })
        }

        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        this.userSubject.next(this.getUser);
        this.router.navigate(['/auth/login']);
    }

    private handleLogin(signInResponse: ISignInResponse): void {
        this.signInResponse = signInResponse;

        localStorage.setItem('user', JSON.stringify(signInResponse.signIn.user));
        localStorage.setItem('access_token', JSON.stringify(signInResponse.signIn.authToken));
        // this.userSubject.next(this.getUser);
        this.router.navigate(['/']);
    }

    public updateUser(newUser: IUser): void {
        // localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newUser));
        this.userSubject.next(newUser);
    }
}