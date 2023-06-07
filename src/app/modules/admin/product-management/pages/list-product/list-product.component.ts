import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { ProductManagementService } from '../../services/product-management.service';
import { Router } from '@angular/router';
import { CustomToastrService } from 'src/app/common/services/custom-toastr.service';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    public products?: IProduct[];
    public showLoadingCategories: boolean = false;
    public status: any = 'ALL';

    constructor(private productManagementService: ProductManagementService,
        private router: Router,
        private toastrService: CustomToastrService,
    ) { }

    ngOnInit(): void {
        this.getProducts(this.status);
    }

    public getProducts(status: any): void {
        console.log(status)
        this.showLoadingCategories = true;
        this.productManagementService.getProducts(status)
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

    public blockProduct($event: number): void {
        this.showLoadingCategories = true;
        this.productManagementService.blockProduct($event)
            .subscribe({
                next: (result) => {
                    this.getProducts(this.status);
                    console.log({ result })
                    this.toastrService.success("Đã cập nhật trạng thái sản phẩm", "");
                },
                error: (e) => {
                    this.showLoadingCategories = false;
                },
                complete: () => {
                    this.showLoadingCategories = false;
                }
            });
    }

    public handleChangeStatus($event: any): void {
        this.getProducts($event.target.value);
    }

}
