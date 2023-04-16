import { IProductDetail } from 'src/app/modules/user/detail-product/models/IProductDetail';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-detail-slide',
    templateUrl: './product-detail-slide.component.html',
    styleUrls: ['./product-detail-slide.component.scss']
})
export class ProductDetailSlideComponent implements OnInit {

    @Input() product?: IProductDetail;

    constructor() { }

    ngOnInit(): void {
    }

}
