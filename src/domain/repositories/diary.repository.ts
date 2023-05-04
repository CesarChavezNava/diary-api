import { Diary, DiaryInput } from "../entities";
import { DairyId } from "../value-objects";

export interface DiaryRepository {
    add(diary: DiaryInput): Promise<void>;
    delete(id: DairyId): Promise<void>;
    find(id: DairyId): Promise<Diary>;
    findAll(): Promise<Diary[]>;
    update(diary: DiaryInput): Promise<void>;
}