import { PurposeType } from '../../../../common/enum/purpose-type';
import { Condition } from '../../../../common/enum/condition';
import { ProductType } from '../../../../common/enum/product-type';
export interface IFilter {
    page: number;
    size: number;
    search?: string | null;
    categoryIds?: number[] | null;
    cityIds?: number[] | null;
    type?: string | null;
    condition?: Condition[] | null;
    purposeTypes?: PurposeType[] | null
    sort?: string | null;
}

export class Filter implements IFilter {
    constructor(
        public page: number,
        public size: number,
        public search?: string | null,
        public categoryIds?: number[] | null,
        public cityIds?: number[] | null,
        public type?: string | null,
        public conditions?: Condition[] | null,
        public sort?: string | null,
        public purposeTypes?: PurposeType[] | null
    ) { }
}