import { Condition } from "src/app/common/enum/condition";
import { Status } from "src/app/common/enum/status-product";

export interface IProductReq {
    id: number,
    categoryId: number,
    title: string,
    description: string,
    status: Status,
    condition: Condition,
    purposeIds: number[],
    cityId: number,
    notice: string,
    imageIds: number[]
}

export class ProductReq implements IProductReq {
    id: number;
    categoryId: number;
    title: string;
    description: string;
    status: Status;
    condition: Condition;
    purposeIds: number[];
    cityId: number;
    notice: string;
    imageIds: number[];

    constructor(
        id: number,
        categoryId: number,
        title: string,
        description: string,
        status: Status,
        condition: Condition,
        purposeIds: number[],
        cityId: number,
        notice: string,
        imageIds: number[]) {
        this.id = id,
            this.categoryId = categoryId,
            this.title = title,
            this.description = description,
            this.status = status,
            this.condition = condition,
            this.purposeIds = purposeIds,
            this.cityId = cityId,
            this.notice = notice,
            this.imageIds = imageIds
    }
}