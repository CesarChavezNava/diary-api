import { Diary, DiaryInput } from "../domain/entities";
import { NotFoundError } from "../domain/exceptions";
import { DiaryRepository } from "../domain/repositories";

export interface ForUpdatingDiary {
    update(diary: DiaryInput): Promise<void>;
}

export class DiaryUpdater implements ForUpdatingDiary {
    constructor(private readonly diaryRepository: DiaryRepository) {}

    async update(diary: DiaryInput): Promise<void> {
        const diaryToValidate: Diary = await this.diaryRepository.find(diary.id);
        if(!diaryToValidate) {
            throw new NotFoundError(`Diary ${diary.id.value} not found.`);
        }

        await this.diaryRepository.update(diary);
    }

}