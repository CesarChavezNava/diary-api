import { BaseError } from "../exceptions";
import { ValueObject } from "./value-object";

export class DiaryComment extends ValueObject<string> {
    check(value: string): void {
        if(!value) {
            throw new BaseError('Comment is null or empty.', 400);
        }
    }
}