import { IPaginate } from './../../../../common/models/pagination';
import { Condition } from './../../../../common/enum/condition';
export interface IFilterProductRes {
    products: IProduct[],
    paginate: IPaginate
}

export interface IProduct {
    id: number,
    name: string,
    thumbnail: string,
    condition: Condition,
    isFavorite: boolean,
    isExchange: boolean,
    isGift: boolean,
    createdDate: string,
    profile: IProfile
}

export interface IProfile {
    id: number,
    displayName: string,
    avatar: string
}