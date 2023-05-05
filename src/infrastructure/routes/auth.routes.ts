import * as express from 'express';
import { Request, Response } from 'express'
import { localComposition } from '../compositions';
import { AuthService } from '../services';
import { HttpError } from '../helpers';

export const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const authService: AuthService = localComposition().authService;
        const { username, password } = req.body;
    
        const accessToken = await authService.login({
            username: username,
            password: password
        });

        res.status(200).send({ accessToken: accessToken });
    } catch(error) {
        HttpError.send(res, error);
    }
});