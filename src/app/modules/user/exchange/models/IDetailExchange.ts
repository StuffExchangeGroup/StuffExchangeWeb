import { ConfirmStatus } from "src/app/common/enum/confirm-status"
import { ExchangeStatus } from "src/app/common/enum/exchange-status"
import { SwapType } from "src/app/common/enum/swap-type"

export interface IDetailExchangeRes {
    total: number,
    myExchanges: IDetailExchange[]
}

export interface IDetailExchange {
    exchangeId: 8,
    ownerConfirm: ConfirmStatus,
    exchangerConfirm: ConfirmStatus,
    exchangeStatus: ExchangeStatus,
    chatting: boolean,
    swapType: SwapType
    myProduct: IExchangeProduct,
    exchangeProduct: IExchangeProduct
}

export interface IExchangeProduct {
    productId: number,
    productName: string,
    thumbnail: string,
    username: string,
    uid: string,
    phone: string,
    reciverProfileId: string,
    avatarUrl: string,
}