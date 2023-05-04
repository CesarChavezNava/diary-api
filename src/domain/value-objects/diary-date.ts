import { BaseError } from "../exceptions";
import { ValueObject } from "./value-object";

export class DiaryDate extends ValueObject<string> {
    check(value: string): void {
        if(!value) {
            throw new BaseError('Date is null or empty.', 400);
        }

        const regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if(!regex.test(value)) {
            throw new BaseError('Date has invalid format.');
        }
    }

}