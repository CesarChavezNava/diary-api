import { CreateDiaryDto, DiaryDto, UpdateDiaryDto } from "../dtos";
import { ForAddingDiary, ForDeletingDiary, ForFindingDiaries, ForFindingDiary, ForUpdatingDiary } from "../../application";
import { Diary, DiaryInput } from "../../domain/entities";
import { DiaryId, DiaryComment, DiaryDate, DiaryVisibility, DiaryWeather } from "../../domain/value-objects";

export class DiaryService {
    constructor(
        private readonly diaryAdder: ForAddingDiary, 
        private readonly diaryDeleter: ForDeletingDiary,
        private readonly diaryFinder: ForFindingDiary, 
        private readonly diariesFinder: ForFindingDiaries,
        private readonly diaryUpdater: ForUpdatingDiary) {}

    async add(dto: CreateDiaryDto): Promise<void> {
        await this.diaryAdder.add(new DiaryInput(
            new DiaryId(dto.id),
            new DiaryDate(dto.date),
            new DiaryComment(dto.comment),
            new DiaryWeather(dto.weather),
            new DiaryVisibility(dto.visibility)
        ));
    }

    async delete(id: number): Promise<void> {
        await this.diaryDeleter.delete(new DiaryId(id));
    }

    async find(id: number): Promise<DiaryDto> {
        const diary: Diary = await this.diaryFinder.find(new DiaryId(id));
        const dto: DiaryDto = { ...diary };

        return dto;
    }

    async findAll(): Promise<DiaryDto[]> {
        const diaries: Diary[] = await this.diariesFinder.find();
        const dtos: DiaryDto[] = [...diaries];

        return dtos;
    }

    async update(dto: UpdateDiaryDto): Promise<void> {
        await this.diaryUpdater.update(new DiaryInput(
            new DiaryId(dto.id),
            new DiaryDate(dto.date),
            new DiaryComment(dto.comment),
            new DiaryWeather(dto.weather),
            new DiaryVisibility(dto.visibility)
        ));
    }
}