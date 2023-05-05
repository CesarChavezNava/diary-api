import { Request, Response } from "express";
import { AuthService } from "../services";
import { localComposition } from "../compositions";

export class AuthMiddleware {
    async validate(req: Request, res: Response, next) {
        const accessToken = req.headers['authorization'];
        if(!accessToken) {
            res.status(401).send('Access denied');
            return;
        }

        const authService: AuthService = localComposition().authService;
        const isValid: boolean = await authService.verify(accessToken);

        if(!isValid) {
            res.status(401).send('Unauthorized');
            return;
        }

        next();
    }
}

export const authMiddleware = new AuthMiddleware();