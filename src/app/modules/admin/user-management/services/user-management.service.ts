import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/common/models/user-login-model';
import { environment } from 'src/environments/environment';
import { IDeleteUserReponse, IListUserReponse, IUserReponse } from '../models/IUser';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    private baseUrl = environment.baseURl;

    constructor(private httpClient: HttpClient) { }

    public getListUser(): Observable<IListUserReponse> {
        return this.httpClient.get<IListUserReponse>(this.baseUrl + 'api/admin/users');
    }

    public getUserById(userId: string): Observable<IUserReponse> {
        return this.httpClient.get<IUserReponse>(this.baseUrl + 'user/' + userId);
    }

    public editUser(user: IUser): Observable<IUserReponse> {
        return this.httpClient.put<IUserReponse>(this.baseUrl + 'user', { user });
    }

    public addUser(user: IUser): Observable<IUserReponse> {
        return this.httpClient.post<IUserReponse>(this.baseUrl + 'user', { user });
    }

    public deleteUser(userId: string): Observable<IDeleteUserReponse> {
        return this.httpClient.delete<IDeleteUserReponse>(this.baseUrl + 'api/admin/users/' + userId);
    }

    public blockUser(userId: string): Observable<any> {
        return this.httpClient.put<any>(this.baseUrl + 'api/admin/users/block/' + userId, null);
    }
}
