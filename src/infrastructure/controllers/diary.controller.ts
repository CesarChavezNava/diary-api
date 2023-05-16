import {Request, Response } from 'express';
import { localComposition } from "../compositions";
import { DiaryDto } from "../dtos";
import { DiaryService } from "../services";
import { HttpError } from '../helpers';

export class DiaryController {
    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const diaryService: DiaryService = localComposition().diaryService;
            const dtos: DiaryDto[] = await diaryService.findAll();
        
            res.status(200).send(dtos);
        } catch(error) {
            HttpError.send(res, error);
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            const diaryService: DiaryService = localComposition().diaryService;
            const dto: DiaryDto = await diaryService.find(+req.params.id);
        
            res.status(200).send(dto);
        } catch(error) {
            HttpError.send(res, error);
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { id, date, comment, weather, visibility } = req.body;
    
            const diaryService: DiaryService = localComposition().diaryService;
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
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { date, comment, weather, visibility } = req.body;
            const id: number = +req.params.id; 
    
            const diaryService: DiaryService = localComposition().diaryService;
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
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const diaryService: DiaryService = localComposition().diaryService;
            await diaryService.delete(+req.params.id);
        
            res.status(204).send('');
        } catch(error) {
            HttpError.send(res, error);
        }
    }
}

export const diaryController = new DiaryController();