

export interface IDataResponse<T> {
    isSuccess: boolean;
    errorMessage: IErrorMessage;
    statusCode: string;
    data: T;
}

export interface IErrorMessage {
    message: string,
    fieldErrs: IFieldErr[]
}

export interface IFieldErr {
    fieldErr: string,
    message: string
}

export interface IResult {
    result: boolean
}