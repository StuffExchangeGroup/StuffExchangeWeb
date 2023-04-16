export interface IMyProductRes {
    myItems: IMyProduct[]
}
export interface IMyProduct {
    id: number,
    title: string,
    thumbnail: string,
    description: string,
    isSwapAvailable: boolean,
    createdDate: Date
}