import { Condition } from "src/app/common/enum/condition";
export interface IWishLists {
    wishlist: IWishList[]
}

export interface IWishList {
    id: number,
    thumbnail: string,
    title: string,
    displayName: string,
    avatar: string,
    isFavorite: boolean,
    productCondition: Condition,
    isExchange: boolean,
    isGift: boolean,
}