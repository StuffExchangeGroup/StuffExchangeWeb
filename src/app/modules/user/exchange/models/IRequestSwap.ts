
export interface IRequestSwap {
    sendProductId: number;
    receiveProductId: number
}

export class RequestSwap implements IRequestSwap {
    sendProductId: number;
    receiveProductId: number;
    constructor(sendProductId: number, receiveProductId: number) {
        this.sendProductId = sendProductId;
        this.receiveProductId = receiveProductId
    }

}