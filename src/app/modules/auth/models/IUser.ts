
export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    displayName: string | undefined;
    latitude: string | undefined;
    longitude: string | undefined;
    email: string;
    activated: string;
    phone: string | undefined;
    avatar: string | undefined;
    dob: Date | null | string;
    cityId: number | undefined;
    location: string | undefined;
    customTokenFirebase: string | undefined;
    uid: string | undefined;
    point: string | undefined;
    userName: string;
    authorities: any
}

export class User implements IUser {
    id!: number;
    firstName!: string;
    lastName!: string;
    displayName: string | undefined;
    latitude: string | undefined;
    longitude: string | undefined;
    email!: string;
    activated!: string;
    phone: string | undefined;
    avatar: string | undefined;
    dob!: Date | null | string;
    cityId: number | undefined;
    location: string | undefined;
    customTokenFirebase: string | undefined;
    uid: string | undefined;
    point: string | undefined;
    userName!: string;
    authorities: any
}
