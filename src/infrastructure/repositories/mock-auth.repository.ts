import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { User } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories";

export class MockAuthRepository implements AuthRepository {
    async login(user: User): Promise<string> {
        dotenv.config();
        return jwt.sign({ username: user.username}, process.env.SECRET, { expiresIn: '1h'});
    }   

    async verify(accessToken: string): Promise<boolean> {
        return jwt.verify(accessToken, process.env.SECRET, (error, _user) => {
            if(error) {
                return false;
            }

            return true;
        });
    }
}