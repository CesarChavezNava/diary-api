import { DiaryRepository } from "../domain/repositories";
import { Diary } from "../domain/entities";
import { DairyId } from "../domain/value-objects";
import { NotFoundError } from "../domain/exceptions";

export interface ForFindingDiary {
    find(id: DairyId): Promise<Diary>
}

export class DiaryFinder implements ForFindingDiary {
    constructor(private readonly diaryRepository: DiaryRepository) {}

    async find(id: DairyId): Promise<Diary> {
        const diary: Diary = await this.diaryRepository.find(id);
        if(!diary) {
            throw new NotFoundError(`Diary ${id.value} not found.`);
        }

        return diary;
    }

}