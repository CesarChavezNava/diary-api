import { DiaryId, DiaryComment, DiaryDate, DiaryVisibility, DiaryWeather } from "../value-objects";

export class DiaryInput {
    readonly id: DiaryId;
    readonly date: DiaryDate;
    readonly comment: DiaryComment;
    readonly weather: DiaryWeather;
    readonly visibility: DiaryVisibility;

    constructor(
        id: DiaryId,
        date: DiaryDate,
        comment: DiaryComment,
        weather: DiaryWeather,
        visibility: DiaryVisibility
    ) {

        this.id = id;
        this.date = date;
        this.comment = comment;
        this.weather = weather;
        this.visibility = visibility;
    }
}