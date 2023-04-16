import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { IUser } from 'src/app/common/models/user-login-model';
import { IListUserReponse } from '../../models/IUser';
import { UserManagementService } from '../../services/user-management.service';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent extends BaseDestroyableDirective implements OnInit {
    public listUser$: Observable<IListUserReponse>;
    public currentUser$: Observable<IUser>;
    public showLoadingUser: boolean;

    constructor(private userManagementService: UserManagementService,
        private router: Router,
        private toastr: ToastrService) {
        super();
        this.listUser$ = new Observable<IListUserReponse>();
        this.currentUser$ = new Observable<IUser>();
        this.showLoadingUser = false;
    }

    ngOnInit(): void {
        this.getListUser();
    }

    public getListUser(): void {
        this.showLoadingUser = true;
        this.listUser$ = this.userManagementService.getListUser().pipe(
            finalize(() => {
                this.showLoadingUser = false;
            }));
    }

    public addUser(): void {
        this.router.navigate(['/admin/user-management/add-user']);
    }

    public editUser($event: string): void {
        this.router.navigate(['/admin/user-management/edit-user/' + $event]);
    }

    public deleteUser($event: string): void {
        this.userManagementService.deleteUser($event)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result.status === TypeResponse.Success) {
                        this.toastr.success('Delete success', TypeNotification.Success);
                        this.getListUser();
                    }
                    else {
                        this.toastr.error(result.message, TypeNotification.Error);
                    }
                },
                error: (e) => this.toastr.success(e.message, TypeNotification.Error),
            });
    }
}
