import { Component, OnInit } from '@angular/core';
import { ROUTES } from 'src/app/common/data/routes';
import { RouteInfo } from 'src/app/common/models/route-info';
// import { IUser } from 'src/app/common/models/user-login-model';
import { AuthService } from 'src/app/common/services/auth.service';
import { IUser } from 'src/app/modules/auth/models/IUser';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public currentTime!: Date;
  public currentUser?: IUser;
  public menuItems?: RouteInfo[];

  constructor(private authService: AuthService) {
    this.currentTime = new Date()
    this.menuItems = ROUTES;
  }

  ngOnInit() {
    this.currentUser = this.authService.user;
  }

  public logout(): void {
    this.authService.logout();
  }
}
