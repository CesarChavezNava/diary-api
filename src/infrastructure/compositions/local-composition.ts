import { DiaryFinder, DiariesFinder, DiaryAdder, DiaryDeleter, DiaryUpdater } from "../../application";
import { LocalDiaryRepository } from "../repositories"
import { DiaryService } from "../services";

export const localComposition = () => {
    const diaryRepository = new LocalDiaryRepository();
    const diaryAdder = new DiaryAdder(diaryRepository);
    const diaryDeleter = new DiaryDeleter(diaryRepository);
    const diaryFinder = new DiaryFinder(diaryRepository);
    const diariesFinder = new DiariesFinder(diaryRepository);
    const diaryUpdater = new DiaryUpdater(diaryRepository);
    const diaryService = new DiaryService(diaryAdder, diaryDeleter, diaryFinder, diariesFinder, diaryUpdater);

    return {
        diaryService
    }
}