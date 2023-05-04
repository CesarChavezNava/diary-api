export class BaseError extends Error {
    readonly code: number;
    constructor(message: string, code?: number) {
        super(message);

        if(!code) {
            code = 500;
        }
        this.code = code;
    }
}