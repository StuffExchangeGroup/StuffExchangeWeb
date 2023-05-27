import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { CategoryManagementService } from '../../services/category-management.service';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent extends BaseDestroyableDirective implements OnInit {
    public messageError!: string;
    public showLoadingUserForm!: boolean;

    constructor(private categoryManagementService: CategoryManagementService,
        private toastr: ToastrService,
        private router: Router) {
        super();
    }

    ngOnInit(): void { }

    public submitUser($event: any): void {
        this.showLoadingUserForm = true;
        this.categoryManagementService.addCategory($event).pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result.status === TypeResponse.Success) {
                        this.toastr.success('Add category success', TypeNotification.Success);
                        this.router.navigate(['admin/category-management/list-category']);
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
