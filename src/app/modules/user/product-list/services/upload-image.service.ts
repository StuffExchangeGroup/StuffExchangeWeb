import { AuthService } from 'src/app/common/services/auth.service';
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDataResponse } from "src/app/common/models/data-response";
import { environment } from "src/environments/environment";
import { IFileRes } from 'src/app/common/models/IFileRes';

@Injectable({ providedIn: 'root' })
export class UploadImageService {
    public baseUrl = environment.baseURl;
    private httpClient: HttpClient;

    constructor(private httpBackend: HttpBackend,
        private authService: AuthService) {
        this.httpClient = new HttpClient(httpBackend);
    }

    public upLoadImage(form: FormData): Observable<IFileRes[]> {
        const access_token = this.authService.getToken
        const headers = new HttpHeaders()
            .append(
                'Authorization',
                'Bearer ' + access_token
            )
            .append('Access-Control-Allow-Origin', '*')
            .append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
            .append('Access-Control-Allow-Headers', ' X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type')

        return this.httpClient.post<IFileRes[]>(this.baseUrl + 'api/app/products/uploadImg', form, { 'headers': headers });
    }
}