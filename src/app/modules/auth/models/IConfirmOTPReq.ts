export interface IConfirmOTPReq {
    email?: string,
    codeOTP?: string,
    password?: string
}

export interface IConfirmOTP {
    email: string;
    codeOTP: string;
}

export class ConfirmOTP implements IConfirmOTP {
    email!: string;
    codeOTP!: string;

    constructor(email: string, codeOTP: string) {
        this.email = email;
        this.codeOTP = codeOTP;
    }
}