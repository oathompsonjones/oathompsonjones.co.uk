export type ActionResponse<T = undefined> = {
    error: Error | null;
    success: false;
} | {
    success: true;
    data: T;
};
