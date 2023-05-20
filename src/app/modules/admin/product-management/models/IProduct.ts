export interface IProduct {
    id?: number,
    name?: string,
    thumbnail?: string,
    active: boolean,
    condition: string,
    createdDate: Date,
    description: string,
    favoriteCount: number,
    status: string
}

export interface IProductRes {
    categories?: IProduct[];
}