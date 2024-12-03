export type ActionResponse<T> = {
    error: Error;
    success: false;
} | {
    success: true;
    data: T;
};
