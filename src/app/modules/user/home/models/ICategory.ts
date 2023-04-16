export interface ICategory {
    id?: number,
    name?: string,
    thumbnail?: string
    isChecked?: boolean;
}

export interface ICategoryRes {
    categories?: ICategory[];
}