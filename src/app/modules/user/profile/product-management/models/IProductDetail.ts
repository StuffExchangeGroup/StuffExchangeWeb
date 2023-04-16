import { Condition } from "src/app/common/enum/condition";
import { Status } from "src/app/common/enum/status-product";

export interface IProductDetailRes {
    product: IProductDetail;
}

export interface IProductDetail {
    id: number,
    title: string,
    productCondition: Condition,
    status: Status,
    description: string,
    thumbnail: string,
    notice: string,
    profileId: number,
    displayName: string,
    avatar: string,
    createdDate: string,
    categoryName: string,
    categoryId: number,
    likedCount: number,
    requestCount: number,
    receiveCount: number,
    isFavorite: boolean,
    stateId: number,
    stateName: string,
    cityName: string,
    cityId: number,
    isExchange: boolean,
    isGift: boolean,
    imageLinks: string[],
}
