import { Diary, DiaryInput } from "../entities";
import { DiaryId } from "../value-objects";

export interface DiaryRepository {
    add(diary: DiaryInput): Promise<void>;
    delete(id: DiaryId): Promise<void>;
    find(id: DiaryId): Promise<Diary>;
    findAll(): Promise<Diary[]>;
    update(diary: DiaryInput): Promise<void>;
}