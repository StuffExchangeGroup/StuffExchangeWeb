import { IProductFirebase } from "./product";

export interface IRoomFirebaseReq {
    name: string,
    roomID: string,
    type: string,
    dateTime: Date,
    exchangeProduct: IProductFirebase,
    ownerProduct: IProductFirebase
}

export class RoomFirebaseReq implements IRoomFirebaseReq {
    name: string;
    roomID: string;
    type: string;
    dateTime: Date;
    exchangeProduct: IProductFirebase;
    ownerProduct: IProductFirebase

    constructor(name: string,
        roomID: string,
        type: string,
        dateTime: Date,
        ownerProduct: IProductFirebase,
        exchangeProduct: IProductFirebase,
    ) {
        this.name = name;
        this.roomID = roomID;
        this.type = type;
        this.exchangeProduct = exchangeProduct;
        this.ownerProduct = ownerProduct;
        this.dateTime = dateTime
    }
}

export interface IRoomFirebaseRes {
    name: string,
    roomID: string,
    type: string,
    dateTime: Date,
    exchangeProduct: IProductFirebase,
    ownerProduct: IProductFirebase
}

