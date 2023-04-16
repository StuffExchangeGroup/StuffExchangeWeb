import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { getCondition } from 'src/app/common/functions/GetCondition';
import { IWishList } from '../models/IWishList';
import { WishListService } from '../service/wish-list.service';

@Component({
    selector: 'app-wish-list',
    templateUrl: './wish-list.component.html',
    styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
    public myWishLists?: IWishList[];
    public getCondition = getCondition;
    constructor(private wishListService: WishListService,
        private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.getWishList();
    }

    getWishList() {
        this.spinner.show();
        this.wishListService.getWishList().subscribe({
            next: (res) => {
                this.myWishLists = res.data.wishlist;
            },
            error: (e) => {
                this.spinner.hide();
            },
            complete: () => {
                this.spinner.hide();
            }
        });
    }

    trackId(index: number, item: IWishList): number {
        return item.id!;
    }
}
