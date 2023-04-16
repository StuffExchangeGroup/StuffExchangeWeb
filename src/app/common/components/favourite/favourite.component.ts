import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IProductDetail } from 'src/app/modules/user/detail-product/models/IProductDetail';
import { ICardSimilar } from 'src/app/modules/user/detail-product/models/ISimilarProduct';
import { ICardProduct } from 'src/app/modules/user/home/models/IHome';
import { IProduct } from 'src/app/modules/user/product-list/models/IProduct';
import { IWishList } from 'src/app/modules/user/profile/models/IWishList';
import { IDataResponse, IResult } from '../../models/data-response';
import { FavouriteService } from '../../services/favourite.service';

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

    public favouriting: boolean = false;
    @Input() product?: ICardProduct | ICardSimilar | IProductDetail | IWishList | IProduct;
    @Input() belongTo?: string;

    @Output() favoriteChangeEvent = new EventEmitter<number>();

    constructor(
        private favouriteService: FavouriteService
    ) { }

    ngOnInit(): void {
    }

    /**
     * @Purpose call favourite api with async await 
     * @param cardId 
     * @param cardType 
     */
    async toggleFavourite(cardId: number, cardType: string): Promise<boolean> {
        this.favouriting = true;
        // conversion observable to Promise
        const toggleFavouriteObservable = this.favouriteService.favouriteProduct(cardId);
        const response: IDataResponse<IResult> = await lastValueFrom(toggleFavouriteObservable);
        if (response.isSuccess) {
            this.ToggleWhiteOrRed(cardId, cardType, response.data.result);
            this.favouriting = false;
        }
        return response.data.result;
    }

    /**
     * @param cardId 
     * @param cardType 
     * @param isFavorite 
     * @purpose change color of heart
     */
    ToggleWhiteOrRed(cardId: number, cardType: string, isFavorite: boolean) {
        let getCardId = `card-${cardId}-${cardType}`;
        const card = document.getElementById(getCardId);
        if (isFavorite) {
            card?.classList.add('favourited');
            this.favoriteChangeEvent.emit(1)
        } else {
            card?.classList.remove('favourited');
            this.favoriteChangeEvent.emit(-1)
        }
    }

}
