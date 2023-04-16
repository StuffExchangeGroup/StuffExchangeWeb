
export interface IMyItems {
    myItems: IMyItem[]
}

export interface IMyItem {
    id: number,
    title: string,
    thumbnail: string,
    description: string,
    isSwapAvailable: boolean
}