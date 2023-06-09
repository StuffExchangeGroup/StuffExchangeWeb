import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivatePermission implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const data = route.data;
        const isLoggedIn = this.authService.isLoggedIn;
        const isAdmin = this.authService.isAdmin;
        if (data['requireAdmin']) {
            if (isAdmin) { return true; }
            else {
                this.router.navigate(['/home']);
                return false;
            }
        }

        if (data['requireLogin']) {
            if (isLoggedIn) {
                // this.router.navigate(['/admin']);
                return true
            }
            this.router.navigate(['/auth/login']);
            return false
        }
        else {
            // this.router.navigate(['/home']);
            return true
        }
    }
}