import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-description-product',
    templateUrl: './description-product.component.html',
    styleUrls: ['./description-product.component.scss']
})
export class DescriptionProductComponent implements OnInit {
    @Input() description?: string;
    @Input() notice?: string;
    @Input() productId?: number;

    constructor() { }

    ngOnInit(): void {
    }

}
