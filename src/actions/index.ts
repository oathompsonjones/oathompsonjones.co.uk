export type ActionResponse<T> = {
    error: string;
    success: false;
} | {
    success: true;
    data: T;
};
