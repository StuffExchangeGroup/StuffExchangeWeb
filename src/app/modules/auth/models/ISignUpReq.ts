export interface ISignUpReq {
    firstName?: string,
    lastName?: string,
    phone?: string | null,
    email?: string,
    userName?: string,
    password?: string,
    countryId?: string
}