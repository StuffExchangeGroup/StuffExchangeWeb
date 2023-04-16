export interface ICategory {
    id?: number,
    name?: string,
    thumbnail?: string
}

export interface ICategoryRes {
    categories?: ICategory[];
}