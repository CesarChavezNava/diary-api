import { Response } from 'express';
import { BaseError } from "src/domain/exceptions";

export class HttpError {
    static send(res: Response, error: BaseError): void;
    static send(res: Response, error: Error): void;
    static send(res: Response,  error: any): void {
        if("code" in error) {
            res.status(error.code).send({ message: error.message });
            return;
        }

        res.status(500).send({ message: error.message });
    }
}