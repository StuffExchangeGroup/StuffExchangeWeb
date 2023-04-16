import { AuthService } from './../../../common/services/auth.service';
import { User } from './../../auth/models/IUser';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-layout',
    templateUrl: './profile-layout.component.html',
    styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

    public user?: User;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser() {
        this.authService.userSubject.subscribe({
            next: (user) => {
                this.user = user;
            }
        });
        this.authService.userSubject.next(this.authService.getUser);
    }

}
