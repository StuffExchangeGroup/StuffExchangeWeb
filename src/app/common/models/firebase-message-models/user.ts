
export interface IUserFirebase {
    avatar: string;
    name: string;
    userID: string;
}

export class UserFirebase implements IUserFirebase {
    avatar: string;
    name: string;
    userID: string;

    constructor(avatar: string,
        name: string,
        userID: string) {
        this.avatar = avatar;
        this.name = name;
        this.userID = userID;
    }
}