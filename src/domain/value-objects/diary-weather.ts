import { Weather } from "../enums";
import { BaseError } from "../exceptions";
import { ValueObject } from "./value-object";

export class DiaryWeather extends ValueObject<Weather> {
    check(value: Weather): void {
        if(!value) {
            throw new BaseError('Weather is null or empty', 400);
        }
    }
}