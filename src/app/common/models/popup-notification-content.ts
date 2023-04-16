
export interface INotificationContent {
    title: string,
    content: string,
    action: string
}

export class NotificationContent implements INotificationContent {
    title: string;
    content: string;
    action: string;

    constructor(title: string, content: string, action: string) {
        this.title = title;
        this.content = content;
        this.action = action;
    }
}