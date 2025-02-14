export type ActionResponse<T> = {
    error: Error | null;
    success: false;
} | {
    success: true;
    data: T;
};
