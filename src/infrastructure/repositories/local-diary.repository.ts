import { Visibility, Weather } from "../../domain/enums";
import { Diary, DiaryInput } from "../../domain/entities";
import { DiaryRepository } from "../../domain/repositories";
import { DiaryId } from "../../domain/value-objects";

export class LocalDiaryRepository implements DiaryRepository {
    static data: Diary[] = [
        {
            id: 1,
            date: '2021-01-01',
            comment: 'Cualquier cosa',
            weather: Weather.Windy,
            visibility: Visibility.good
        },
        {
            id: 2,
            date: '2022-01-01',
            comment: 'Otra cosa',
            weather: Weather.cloudy,
            visibility: Visibility.poor
        },
        {
            id: 3,
            date: '2023-01-01',
            comment: 'Lo que sea',
            weather: Weather.sunny,
            visibility: Visibility.ok
        }
    ];

    async add(diary: DiaryInput): Promise<void> {
        LocalDiaryRepository.data.push({
            id: diary.id.value,
            date: diary.date.value,
            comment: diary.comment.value,
            weather: diary.weather.value,
            visibility: diary.visibility.value
        });
    }

    async delete(id: DiaryId): Promise<void> {
        LocalDiaryRepository.data = LocalDiaryRepository.data.filter(diary => diary.id !== id.value);
    }

    async find(id: DiaryId): Promise<Diary> {
        return LocalDiaryRepository.data.find(diary => diary.id === id.value);
    }
    
    async findAll(): Promise<Diary[]> {
        return LocalDiaryRepository.data;
    }

    async update(diary: DiaryInput): Promise<void> {
        await this.delete(diary.id);
        await this.add(diary);
    }
}