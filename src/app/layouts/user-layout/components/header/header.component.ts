import { Router, ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { IUser } from 'src/app/modules/auth/models/IUser';
import { NotificationService } from 'src/app/common/services/notification.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    isHeaderHide: boolean = false;
    lastScrollTop = 0;
    search = '';
    isLogin: boolean = false;
    user?: IUser;
    isHomeActive: boolean = false;
    notificationCount?: number;

    suggestionList: any = [
        { 'id': 1, 'name': 'Áo' },
        { 'id': 6, 'name': 'Đồng hồ' },
        { 'id': 2, 'name': 'Tai nghe' },
        { 'id': 3, 'name': 'Điện thoại' },
        { 'id': 4, 'name': 'Đồ gia dụng' },
        { 'id': 5, 'name': 'Sách công nghệ' },
        { 'id': 7, 'name': 'Túi sách' },
    ]

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private notificationService: NotificationService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
        this.router.onSameUrlNavigation = 'reload';
    }

    ngOnInit(): void {
        this.isHomeActive = true;
        this.getIsLogin();
        this.countUnseenNotification();
        this.activatedRoute.queryParamMap
            .subscribe(params => {
                const searchKey = params.get('search')?.trim();
                if (searchKey) {
                    this.search = searchKey;
                }
            })
    }

    @HostListener('window:scroll', ['$event']) onScroll(): void {
        const doc = document.documentElement;
        const w = window;
        const scrollTop = w.pageYOffset || doc.scrollTop;

        if (scrollTop !== 0) {
            this.isHeaderHide = true;
        } else {
            this.isHeaderHide = false;
        }
        // this.lastScrollTop = scrollTop;
    }

    getIsLogin() {
        this.isLogin = this.authService.isLoggedIn;
        if (this.isLogin) {
            this.authService.userSubject.subscribe({
                next: (user) => {
                    this.user = user;
                }
            });
            this.authService.userSubject.next(this.authService.getUser)

        }
    }

    logout() {
        this.authService.logout();
    }

    // submit to search by key word
    onSubmit(): void {
        if (this.search) {
            this.router.navigate(['/products'], { queryParams: { search: this.search } })
        }
    }

    // search by suggestion key
    selectSuggestion(input: any) {
        this.search = input;
        this.router.navigate(['/products'], { queryParams: { search: this.search } })
        // this.router.navigate(['/products']);
    }

    // onSelectProductsPage() {
    //     this.router.navigate(['/products'])
    // }

    public countUnseenNotification(): void {
        if (!this.isLogin) {
            return
        }
        this.notificationService.countUnseenNotification().subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.notificationCount = res.data.notification;
                }
            }
        })
    }
}
