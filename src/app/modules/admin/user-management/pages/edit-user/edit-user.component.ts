import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, map, Observable, takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { IUser } from 'src/app/common/models/user-login-model';
import { UserManagementService } from '../../services/user-management.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends BaseDestroyableDirective implements OnInit {
    public user$: Observable<IUser>
    public messageError!: string;
    public showLoadingUserForm!: boolean;

    constructor(private userManagementService: UserManagementService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router
    ) {
        super();
        this.user$ = new Observable<IUser>();
    }

    ngOnInit(): void {
        const userID = this.activatedRoute.snapshot.paramMap.get('userId') || '';
        this.getUser(userID);
    }

    public getUser(userId: string) {
        this.showLoadingUserForm = true;
        this.user$ = this.userManagementService.getUserById(userId).pipe(
            map(res => res.user),
            finalize(() => this.showLoadingUserForm = false)
        );
    }

    public submitUser($event: any): void {
        this.userManagementService.editUser($event)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result.status === TypeResponse.Success) {
                        this.toastr.success('Edit user success', TypeNotification.Success);
                        this.router.navigate(['/admin/user-management/list-user']);
                    }
                    else {
                        this.toastr.error(result.message, TypeNotification.Error);
                    }
                },
                error: (e) => this.toastr.success(e.message, TypeNotification.Error),
            });
    }
}
