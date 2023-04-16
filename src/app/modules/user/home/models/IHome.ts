import { Condition } from "src/app/common/enum/condition"

export interface IProductResponse {
    products: ICardProduct[]
}

export interface ICardProduct {
    id: number,
    name: string,
    thumbnail: string,
    condition: Condition,
    isFavorite: boolean,
    salePoint: number,
    auctionPoint: number,
    currentPoint: number,
    createdDate: string,
    isExchange: boolean,
    isAuction: boolean,
    isSell: boolean,
    isGift: boolean,
    profile: IProfileProduct
}

export interface IProfileProduct {
    id: number,
    displayName: string,
    avatar: string
}
