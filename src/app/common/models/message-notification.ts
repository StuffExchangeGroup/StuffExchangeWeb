
export interface IMessageNotification {
    message?: string,
    userUID?: string,
    partnerUID?: string
}

export class MessageNotification implements IMessageNotification {
    message?: string;
    userUID?: string;
    partnerUID?: string;

    constructor(message?: string,
        userUID?: string,
        partnerUID?: string) {
        this.message = message;
        this.userUID = userUID;
        this.partnerUID = partnerUID;
    }

}