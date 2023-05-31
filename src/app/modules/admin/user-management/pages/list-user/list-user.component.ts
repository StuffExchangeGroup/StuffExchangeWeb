import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { IUser } from 'src/app/common/models/user-login-model';
// import { IListUserReponse } from '../../models/IUser';
import { UserManagementService } from '../../services/user-management.service';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent extends BaseDestroyableDirective implements OnInit {
    public listUser?: IUser[];
    public currentUser$: Observable<IUser>;
    public showLoadingUser: boolean;

    constructor(private userManagementService: UserManagementService,
        private router: Router,
        private toastr: ToastrService) {
        super();
        this.currentUser$ = new Observable<IUser>();
        this.showLoadingUser = false;
    }

    ngOnInit(): void {
        this.getListUser();
    }

    public getListUser(): void {
        this.showLoadingUser = true;
        this.userManagementService.getListUser()
            .subscribe({
                next: (result: any) => {
                    this.listUser = result;
                },
                error: (e) => {
                    this.showLoadingUser = false;
                },
                complete: () => {
                    this.showLoadingUser = false;
                }
            });
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

    public blockUser($event: string): void {
        this.userManagementService.blockUser($event)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result) {
                        this.toastr.success('Cập nhật thành công', TypeNotification.Success);
                        this.getListUser();
                    }
                    else {
                        this.toastr.error("Có lỗi xảy ra", TypeNotification.Error);
                    }
                },
                error: (e) => this.toastr.success(e.message, TypeNotification.Error),
            });
    }
}
function error(error: any): void {
    throw new Error('Function not implemented.');
}

