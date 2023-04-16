import { Condition } from "src/app/common/enum/condition";
export interface IProductSimilar {
    products: ICardSimilar[];
}

export interface ICardSimilar {
    id: number,
    productName: string,
    isFavorite: boolean,
    isExchange: boolean,
    isGift: boolean,
    productCondition: Condition,
    thumbnail: string,
    createdDate: string,
    categoryName: string,
    displayName: string,
    avatar: string,
    categoryId: number
}
// export interface IProfileProduct {
//     id: string,
//     displayName: string,
//     avatar: string
// }