import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Condition } from 'src/app/common/enum/condition';
import { Status } from 'src/app/common/enum/status-product';
import { PopupSwapComponent } from 'src/app/modules/user/detail-product/components/popup-swap/popup-swap.component';
import { IProductDetail } from '../../models/IProductDetail';
import { DetailProductService } from '../../services/detail-product.service';
import '../../../../../../../assets/js/zalo.js'

@Component({
    selector: 'app-product-information',
    templateUrl: './product-information.component.html',
    styleUrls: ['./product-information.component.scss']
})
export class ProductInformationComponent implements OnInit {

    @Input() product?: IProductDetail;
    @Input() shareUrl?: string;
    @Input() shareUrlToFb?: string;

    constructor(
        private popUp: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.loadScript();
    }

    public loadScript() {
        let body = <HTMLDivElement>document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://sp.zalo.me/plugins/sdk.js';
        script.async = true;
        script.defer = true;
        body.appendChild(script);
    }

    getStatus(status?: Status) {
        if (status as Status === Status.AVAILABLE as Status) {
            return "Sẵn có";
        } else if (status === Status.SWAPPED) {
            return "Đã trao đổi";
        }
        return "";
    }

    getCondition(condition?: Condition) {
        if (condition as Condition === Condition.NEW as Condition) {
            return "Mới"
        } else if (condition === Condition.LIKENEW) {
            return "Hàng 99%"
        } else if (condition == Condition.USED) {
            return "Đã sử dụng"
        }
        return "";
    }

    openPopUpSwap() {
        this.popUp.open(PopupSwapComponent, { data: this.product?.id });
    }

    closePopUpSwap() {
        this.popUp.closeAll();
    }

}
