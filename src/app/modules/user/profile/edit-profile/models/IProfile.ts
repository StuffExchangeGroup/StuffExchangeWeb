export interface IProfile {
    firstName?: string,
    lastName?: string,
    dob?: Date | null | string;
    avatar?: string;
    phone?: string | null;
    email?: string | null;
}

export class Profile implements IProfile {
    public firstName?: string;
    public lastName?: string;
    public dob?: Date | null | string;
    public avatar?: string;
    public phone?: string | null;
    public email?: string | null;

    public constructor(firstName?: string, lastName?: string, dob?: Date | null | string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
    }

    public set setAvatar(avatar: string) {
        if (avatar.length <= 0) {
            throw new Error('Avatar link invalid');
        }
        this.avatar = avatar;
    }
}