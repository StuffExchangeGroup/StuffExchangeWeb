import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ExchangeAction } from "src/app/common/enum/exchange-action";
import { ExchangeStatus } from "src/app/common/enum/exchange-status";
import { SwapType } from "src/app/common/enum/swap-type";
import { IDataResponse } from "src/app/common/models/data-response";
import { environment } from "src/environments/environment";
import { IDetailExchangeRes } from "../models/IDetailExchange";
import { ExchangeConfirm } from "../models/IExchangeConfirm";
import { IMyExchangeRes } from "../models/IMyExchangeRes";
import { RequestSwap } from "../models/IRequestSwap";


@Injectable({ providedIn: "root" })
export class ExchangeService {

    private baseUrl = environment.baseURl;

    constructor(private router: Router,
        private httpClient: HttpClient) {
    }

    public postToSwap(sendProductId: number, receiveProductId: number): Observable<IDataResponse<any>> {
        const requestSwap = new RequestSwap(sendProductId, receiveProductId);
        const body = JSON.stringify(requestSwap);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/exchanges/swap', body);
    }

    public getMyExchange(exchangeStatus: ExchangeStatus): Observable<IDataResponse<IMyExchangeRes>> {
        let exchangeParam = new HttpParams();
        if (exchangeStatus !== ExchangeStatus.ALL) {
            exchangeParam = exchangeParam.append("exchangeStatus", exchangeStatus);
        }
        return this.httpClient.get<IDataResponse<IMyExchangeRes>>(this.baseUrl + 'api/app/exchanges/my-exchanges', { params: exchangeParam });
    }

    public getDetailExchangeByProductId(productId: number, swapType: SwapType): Observable<IDataResponse<IDetailExchangeRes>> {
        let swapParam = new HttpParams();
        if (swapType !== SwapType.ALL) {
            swapParam = swapParam.append("type", swapType);
        }
        swapParam = swapParam.append("productId", productId);
        return this.httpClient.get<IDataResponse<IDetailExchangeRes>>(this.baseUrl + 'api/app/exchanges/item-swaps', { params: swapParam });
    }

    public confirmSwap(exchangeId: number, exchangeAction: ExchangeAction): Observable<IDataResponse<any>> {
        const exchangeConfirm = new ExchangeConfirm(exchangeId, exchangeAction);
        const exchangeConfirmBody = JSON.stringify(exchangeConfirm);
        return this.httpClient.post<IDataResponse<any>>(this.baseUrl + 'api/app/exchanges/confirm-swap', exchangeConfirmBody);
    }

    public startConversation(exchangeId: number): Observable<IDataResponse<any>> {
        return this.httpClient.put<IDataResponse<any>>(this.baseUrl + 'api/app/exchanges/start-chatting/' + exchangeId, null);
    }
}