import { Visibility, Weather } from "../enums";

export class Diary {
    readonly id: number;
    readonly date: string;
    readonly weather: Weather;
    readonly visibility: Visibility;
    readonly comment: string;

    constructor(id: number, date: string, weather: Weather, visibility: Visibility, comment: string) {
        this.id = id;
        this.date = date;
        this.weather = weather;
        this.visibility = visibility;
        this.comment = comment;
    }
}