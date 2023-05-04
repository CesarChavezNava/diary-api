import { DiaryInput } from "../domain/entities";
import { BaseError } from "../domain/exceptions";
import { DiaryRepository } from "../domain/repositories";

export interface ForAddingDiary {
    add(diary: DiaryInput): Promise<void>;
}

export class DiaryAdder implements ForAddingDiary {
    constructor(private readonly diaryRepository: DiaryRepository){}

    async add(diary: DiaryInput): Promise<void> {
        const diaryToValidate = await this.diaryRepository.find(diary.id);
        if(diaryToValidate) {
            throw new BaseError(`Diary ${diary.id.value} already exists`, 400);
        }

        await this.diaryRepository.add(diary);
    }

}