import { User } from "../entities";

export interface AuthRepository {
    login(user: User): Promise<string>;
    verify(accessToken: string): Promise<boolean>;
}