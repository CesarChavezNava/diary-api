import { Diary } from "../domain/entities";
import { DiaryRepository } from "../domain/repositories";

export interface ForFindingDiaries {
    find(): Promise<Diary[]>
}

export class DiariesFinder implements ForFindingDiaries {
    constructor(private readonly diaryRepository: DiaryRepository){}

    async find(): Promise<Diary[]> {
        return await this.diaryRepository.findAll();
    }

}