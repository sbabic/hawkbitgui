export interface ApiError {
    exceptionClass: string;
    errorCode: string;
    message: string;
    info: Record<string, unknown>;
}
