export interface IUpdatePassword {
    email: string,
    password: string
}

export class UpdatePassword implements IUpdatePassword {
    email!: string;
    password!: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}