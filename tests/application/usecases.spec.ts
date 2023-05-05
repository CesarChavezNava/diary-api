import { DiaryAdder, DiaryDeleter, ForAddingDiary, ForDeletingDiary } from "../../src/application";
import { Diary, DiaryInput } from "../../src/domain/entities";
import { DiaryRepository } from "../../src/domain/repositories";
import { DiaryId, DiaryComment, DiaryDate, DiaryVisibility, DiaryWeather } from "../../src/domain/value-objects";
import { Visibility, Weather } from "../../src/domain/enums";
import { BaseError, NotFoundError } from "../../src/domain/exceptions";

let mockDiaryRepository: jest.Mocked<DiaryRepository>;
let diaryAdder: ForAddingDiary;
let diaryDeleter: ForDeletingDiary;

beforeEach(() => {
    mockDiaryRepository = {
        add: jest.fn(),
        delete: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    };

    diaryAdder = new DiaryAdder(mockDiaryRepository);
    diaryDeleter = new DiaryDeleter(mockDiaryRepository);
});

describe('add diary', () => {
    test('should return empty result', async () => {
        const diary = new DiaryInput(
            new DiaryId(10),
            new DiaryDate('2021-11-11'),
            new DiaryComment('Prueba'),
            new DiaryWeather(Weather.Stormy),
            new DiaryVisibility(Visibility.poor)
        );

        await diaryAdder.add(diary);
        expect(mockDiaryRepository.add).toHaveBeenCalledWith(diary);
        expect(mockDiaryRepository.add).toBeCalledTimes(1);
    });

    test('should return "Diary 1 already exists"', async () => {
        const diary = new DiaryInput(
            new DiaryId(1),
            new DiaryDate('2021-11-11'),
            new DiaryComment('Prueba'),
            new DiaryWeather(Weather.Stormy),
            new DiaryVisibility(Visibility.poor)
        );
        mockDiaryRepository.find.mockResolvedValueOnce(
            new Diary(1, '2022-11-11', Weather.Windy, Visibility.good, 'Lo que sea')
        );

        await expect(diaryAdder.add(diary)).rejects.toThrow(
            new BaseError('Diary 1 already exists')
        );
    })
});

describe('delete diary', () => {
    test('should return empty result', async () => {
        const id = new DiaryId(1);

        await diaryDeleter.delete(id);
        expect(mockDiaryRepository.add).toHaveBeenCalledWith(id);
        expect(mockDiaryRepository.add).toBeCalledTimes(1);
    });

    test('should return "Diary 5 not found"', async () => {
        mockDiaryRepository.find.mockResolvedValueOnce(undefined);

        await expect(diaryDeleter.delete(new DiaryId(5))).rejects.toThrow(
            new NotFoundError('Diary 5 not found.')
        );
    })
});