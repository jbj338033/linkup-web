export interface BaseResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}