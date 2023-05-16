import { Request, Response } from 'express';
import { localComposition } from "../compositions";
import { AuthService } from "../services";
import { HttpError } from '../helpers';

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
        
            const authService = localComposition().authService;
            const accessToken = await authService.login({
                username: username,
                password: password
            });
    
            res.status(200).send({ accessToken: accessToken });
        } catch(error) {
            HttpError.send(res, error);
        }
    }
}

export const authController = new AuthController();