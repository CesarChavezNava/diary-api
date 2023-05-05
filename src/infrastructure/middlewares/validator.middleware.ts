import { Request, Response } from 'express';
import { body, validationResult } from "express-validator"

export const validate = [
    body('id')
    .exists()
    .withMessage('Diary id is required.')
    .isNumeric()
    .withMessage('Diary id must be a number.')
    .custom((value) => {
        if(value <= 0) {
            throw new Error('Diary id must be grater than 0.')
        }

        return true;
    }),
    body('date')
    .exists()
    .withMessage('Date is required.')
    .notEmpty()
    .withMessage('Date must not be empty.')
    .custom((value) => {
        const regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if(!regex.test(value)) {
            throw new Error('Date is a invalid format.');
        }
        
        return true;
    }),
    body('comment')
    .exists()
    .withMessage('Comment is required.')
    .notEmpty()
    .withMessage('Comment must not be empty.'),
    body('weather')
    .exists()
    .withMessage('Weather is required.')
    .notEmpty()
    .withMessage('Weather must not be empty.')
    .isIn(['Sunny','Rainy', 'Cloudy','Windy', 'Stormy'])
    .withMessage('Weather is a invalid value.'),
    body('visibility')
    .exists()
    .withMessage('Visibility is required.')
    .notEmpty()
    .withMessage('Visibility must not be empty.')
    .isIn(['Great', 'Good', 'Ok', 'Poor'])
    .withMessage('Visibility is a invalid value.'),
    async (req: Request, res: Response, next) => {
        const errors  = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).send({ messages: errors.array().map((error) => error.msg) })
            return;
        }

        next();
    }
];
