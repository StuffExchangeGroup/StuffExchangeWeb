import { IUser } from "./IUser";

export interface IConfirmOTPData {
    authToken: string;
    tokenType: string;
    user: IUser;
    useOTP: boolean,
    otpStatus: boolean
}

export interface IConfirmOTPRes {
    signIn: IConfirmOTPData
}
