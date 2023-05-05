import { DiaryFinder, DiariesFinder, DiaryAdder, DiaryDeleter, DiaryUpdater, UserLogger, AccessTokenVerifyer } from "../../application";
import { LocalDiaryRepository, MockAuthRepository } from "../repositories"
import { AuthService, DiaryService } from "../services";

export const localComposition = () => {
    const diaryRepository = new LocalDiaryRepository();
    const diaryAdder = new DiaryAdder(diaryRepository);
    const diaryDeleter = new DiaryDeleter(diaryRepository);
    const diaryFinder = new DiaryFinder(diaryRepository);
    const diariesFinder = new DiariesFinder(diaryRepository);
    const diaryUpdater = new DiaryUpdater(diaryRepository);
    const diaryService = new DiaryService(diaryAdder, diaryDeleter, diaryFinder, diariesFinder, diaryUpdater);

    const authRepository = new MockAuthRepository();
    const userLogger = new UserLogger(authRepository);
    const accessTokenVerifyer = new AccessTokenVerifyer(authRepository);
    const authService = new AuthService(userLogger, accessTokenVerifyer);

    return {
        diaryService,
        authService
    }
}