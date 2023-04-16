import { Condition } from './../../../../common/enum/condition';
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
    likedCount: number,
    requestCount: number,
    receiveCount: number,
    isFavorite: boolean,
    cityName: string,
    cityId: number,
    imageLinks: string[],
}
