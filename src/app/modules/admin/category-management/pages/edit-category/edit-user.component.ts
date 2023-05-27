import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, map, Observable, takeUntil } from 'rxjs';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { TypeNotification } from 'src/app/common/enum/type-notification';
import { TypeResponse } from 'src/app/common/enum/type-reposone';
import { IUser } from 'src/app/common/models/user-login-model';
import { CategoryManagementService } from '../../services/category-management.service';
import { ICategory } from '../../models/ICategory';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent extends BaseDestroyableDirective implements OnInit {
    public category$: Observable<ICategory>
    public messageError!: string;
    public showLoadingCategoryForm!: boolean;

    constructor(private categoryManagementService: CategoryManagementService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router
    ) {
        super();
        this.category$ = new Observable<ICategory>();
    }

    ngOnInit(): void {
        const userID = this.activatedRoute.snapshot.paramMap.get('userId') || '';
        this.getUser(userID);
    }

    public getUser(userId: string) {
        this.showLoadingCategoryForm = true;
        this.category$ = this.categoryManagementService.getCategoryById(userId).pipe(
            map(res => res.user),
            finalize(() => this.showLoadingCategoryForm = false)
        );
    }

    public submitUser($event: any): void {
        this.categoryManagementService.editCategory($event)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (result.status === TypeResponse.Success) {
                        this.toastr.success('Edit category success', TypeNotification.Success);
                        this.router.navigate(['/admin/category-management/list-category']);
                    }
                    else {
                        this.toastr.error(result.message, TypeNotification.Error);
                    }
                },
                error: (e) => this.toastr.success(e.message, TypeNotification.Error),
            });
    }
}
