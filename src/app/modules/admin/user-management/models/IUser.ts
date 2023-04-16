import { TypeResponse } from "src/app/common/enum/type-reposone";
import { IUser } from "src/app/common/models/user-login-model";

export interface IListUserReponse { 
    users: IUser[],
    status: TypeResponse,
    message: string
}

export interface IUserReponse { 
    user: IUser,
    status: TypeResponse,
    message: string
}

export interface IDeleteUserReponse { 
    status: TypeResponse,
    message: string
}