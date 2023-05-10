export interface ICategory {
    id?: number,
    name?: string,
    thumbnail?: string,
    active: boolean
}

export interface ICategoryRes {
    categories?: ICategory[];
}