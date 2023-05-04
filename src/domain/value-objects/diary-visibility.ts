import { Visibility } from "../enums";
import { BaseError } from "../exceptions";
import { ValueObject } from "./value-object";

export class DiaryVisibility extends ValueObject<Visibility> {
    check(value: Visibility): void {
        if(!value) {
            throw new BaseError('Visibility is null or empty', 400);
        }
    }
}