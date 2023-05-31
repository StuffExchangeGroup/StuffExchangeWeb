export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserLoginResponse {
    user: IUser;
    status: string;
    message: string;
}

// export interface IUser {
//     uid: string;
//     name: string;
//     email: string;
//     accessToken: string;
//     type: string;
//     imgURL: string;
//     password: string
// }

export interface IUser {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string,
    activated: string,
    createdDate: string,
    name: string;
    accessToken: string;
    type: string;
    imgURL: string;
    password: string;
    isBlock: boolean;
}