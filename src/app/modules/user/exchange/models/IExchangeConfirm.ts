import { ExchangeAction } from "src/app/common/enum/exchange-action";

export interface IExchangeConfirm {
    exchangeId: number,
    action: ExchangeAction
}

export class ExchangeConfirm implements IExchangeConfirm {
    exchangeId: number;
    action: ExchangeAction;

    constructor(exchangeId: number, action: ExchangeAction) {
        this.exchangeId = exchangeId;
        this.action = action;
    }
}