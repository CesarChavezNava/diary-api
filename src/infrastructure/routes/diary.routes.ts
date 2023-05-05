import * as express from 'express';
import { DiaryService } from '../services';
import { localComposition } from '../compositions';
import { DiaryDto } from '../dtos';
import { HttpError } from '../helpers';
import { validate } from '../middlewares';

export const diaryRouter = express.Router();

diaryRouter.get('/', async (_req, res) => {
    try {
        const diaryService: DiaryService = localComposition().diaryService;
        const dtos: DiaryDto[] = await diaryService.findAll();
    
        res.status(200).send(dtos);
    } catch(error) {
        HttpError.send(res, error);
    }
    
});

diaryRouter.get('/:id', async (req, res) => {
    try {
        const diaryService: DiaryService = localComposition().diaryService;
        const dto: DiaryDto = await diaryService.find(+req.params.id);
    
        res.status(200).send(dto);
    } catch(error) {
        HttpError.send(res, error);
    }
});

diaryRouter.post('/', validate,  async (req, res) => {
    try {
        const diaryService: DiaryService = localComposition().diaryService;
        const { id, date, comment, weather, visibility } = req.body;

        await diaryService.add({
            id,
            date,
            comment,
            weather,
            visibility
        });
        res.status(201).send('');
    } catch(error) {
        HttpError.send(res, error);
    }
});

diaryRouter.put('/:id', async (req, res) => {
    try {
        const diaryService: DiaryService = localComposition().diaryService;
        const { date, comment, weather, visibility } = req.body;
        const id: number = +req.params.id; 

        await diaryService.update({
            id,
            date,
            comment,
            weather,
            visibility
        });
        res.status(204).send('');
    } catch(error) {
        HttpError.send(res, error);
    }
});

diaryRouter.delete('/:id', async (req, res) => {
    try {
        const diaryService: DiaryService = localComposition().diaryService;
        await diaryService.delete(+req.params.id);
    
        res.status(204).send('');
    } catch(error) {
        HttpError.send(res, error);
    }
});