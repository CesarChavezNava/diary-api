import * as express from 'express';
import { validate } from '../middlewares';
import { diaryController } from '../controllers';

export const diaryRouter = express.Router();

diaryRouter.get('/', diaryController.getAll);

diaryRouter.get('/:id', diaryController.get);

diaryRouter.post('/', validate,  diaryController.create);

diaryRouter.put('/:id', diaryController.update);

diaryRouter.delete('/:id', diaryController.delete);