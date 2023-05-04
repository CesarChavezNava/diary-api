import { BaseError } from "../exceptions";
import { ValueObject } from "./value-object";

export class DairyId extends ValueObject<number> {
    check(value: number): void {
        if(!value) {
            throw new BaseError('Diary Id is null or undefinded', 400);
        }
    }
}