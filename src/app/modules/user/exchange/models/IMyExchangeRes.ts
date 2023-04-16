import { ExchangeStatus } from "src/app/common/enum/exchange-status";

export interface IMyExchangeRes {
    myExchanges: IMyExchange[]
}

export interface IMyExchange {
    exchangeId: number,
    productId: number,
    productName: string,
    avatarProduct: string,
    updatedDate: Date,
    exchangeStatus: ExchangeStatus
}