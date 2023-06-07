import { Component, OnInit } from '@angular/core';
import { DashboardManagementService } from '../../services/dashboard-management.service';
import { IDashboard } from '../../models/dashboard';
import { ProductManagementService } from '../../../product-management/services/product-management.service';
import { IProduct } from '../../../product-management/models/IProduct';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
    public dashboard?: IDashboard;
    public recentProduct?: IProduct[];

    constructor(private dashboardService: DashboardManagementService,
        private productManagementService: ProductManagementService
    ) {

    }
    ngOnInit() {
        this.getDashboardInfo();
        this.getProducts();
    }

    getDashboardInfo() {
        this.dashboardService.getDashboardInfo()
            .subscribe({
                next: (result) => {
                    this.dashboard = result;
                },
                error: (e) => {
                    console.log(e)
                    // this.showLoadingCategories = false;
                },
                complete: () => {
                    // this.showLoadingCategories = false;
                }
            });
    }

    public getProducts(): void {
        this.productManagementService.getProducts(0)
            .subscribe({
                next: (result) => {
                    result = result.slice(0, 5);
                    this.recentProduct = result;
                },
                error: (e) => {
                },
                complete: () => {
                }
            });
    }
}
