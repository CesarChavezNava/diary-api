import { Diary } from "../domain/entities";
import { DiaryId } from "../domain/value-objects";
import { DiaryRepository } from "../domain/repositories";
import { NotFoundError } from "../domain/exceptions";

export interface ForDeletingDiary {
    delete(id: DiaryId): Promise<void>;
}

export class DiaryDeleter implements ForDeletingDiary {
    constructor(private readonly diaryRepository: DiaryRepository) {}

    async delete(id: DiaryId): Promise<void> {
        const diary: Diary = await this.diaryRepository.find(id);
        if(!diary) {
            throw new NotFoundError(`Diary ${id.value} not found.`);
        }

        await this.diaryRepository.delete(id);
    }

}