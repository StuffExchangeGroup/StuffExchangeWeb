export interface IChangePassword {
    oldPassword: string,
    newPassword: string
}

export class ChangePassword implements IChangePassword {
    oldPassword!: string;
    newPassword!: string;
}