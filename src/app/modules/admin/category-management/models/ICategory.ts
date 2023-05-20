export interface ICategory {
    id?: number,
    name?: string,
    thumbnail?: string,
    active: boolean,
    description: string,
}

export interface ICategoryRes {
    categories?: ICategory[];
}