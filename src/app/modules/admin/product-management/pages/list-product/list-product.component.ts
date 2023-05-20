import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ProductManagementService } from '../../services/product-management.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    public products?: IProduct[];
    public showLoadingCategories: boolean = false;

    constructor(private productManagementService: ProductManagementService,
        private router: Router) { }

    ngOnInit(): void {
        this.getProducts();
    }

    public getProducts(): void {
        this.showLoadingCategories = true;
        this.productManagementService.getProducts()
            .subscribe({
                next: (result) => {
                    this.products = result;
                    console.log({ result })
                },
                error: (e) => {
                    this.showLoadingCategories = false;
                },
                complete: () => {
                    this.showLoadingCategories = false;
                }
            });
    }

    public editProduct($event: string): void {
        this.router.navigate(['/admin/user-management/add-user']);
    }

    public deleteProduct($event: string): void {
        this.router.navigate(['/admin/user-management/edit-user/' + $event]);
    }

}
