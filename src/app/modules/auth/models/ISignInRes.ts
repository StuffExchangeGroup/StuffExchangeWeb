import { IUser } from "./IUser";


export interface ISignInResponse {
    signIn : IDataSignInResponse
}

export interface IDataSignInResponse {
    authToken: string;
    tokenType: string;
    user: IUser;
    useOTP: boolean,
    otpStatus: boolean
}