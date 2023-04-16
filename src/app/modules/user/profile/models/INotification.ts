export interface INotification {
    id: number,
    subject: string,
    content: string,
    thumbnail: string,
    productId: number,
    createdDate: Date,
    isSeen: boolean
}

export interface INotificationRes {
    notifications: INotification[]
}