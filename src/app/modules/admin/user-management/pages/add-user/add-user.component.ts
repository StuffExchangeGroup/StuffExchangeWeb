import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { UserManagementService } from '../../services/user-management.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends BaseDestroyableDirective implements OnInit {
    public messageError!: string;
    public showLoadingUserForm!: boolean;

    constructor(private userManagementService: UserManagementService,
        private toastr: ToastrService,
        private router: Router) {
        super();
    }

    ngOnInit(): void { }

    public submitUser($event: any): void {
        this.showLoadingUserForm = true;
        this.userManagementService.addUser($event).pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result.status === TypeResponse.Success) {
                        this.toastr.success('Add user success', TypeNotification.Success);
                        this.router.navigate(['admin/user-management/list-user']);
                    }
                    else {
                        this.toastr.error(result.message, TypeNotification.Error);
                    }
                },
                error: (e) => this.toastr.success(e.message, TypeNotification.Error),
                complete: () => this.showLoadingUserForm = true
            });
    }
}
