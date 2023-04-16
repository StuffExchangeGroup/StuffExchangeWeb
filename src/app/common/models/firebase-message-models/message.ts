
export interface IMessageReq {
    message: string,
    timestamp: number,
    userID: string
}

export class MessageReq implements IMessageReq {
    message: string;
    timestamp: number;
    userID: string;

    constructor(message: string,
        timestamp: number,
        userID: string) {
        this.message = message;
        this.timestamp = timestamp;
        this.userID = userID;
    }
}
export interface IMessageRes {
    message: string,
    timestamp: number,
    userID: string
}