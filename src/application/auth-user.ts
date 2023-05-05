import { AuthRepository } from "../domain/repositories";
import { User } from "../domain/entities";

export interface ForLoginingUser {
    login(user: User): Promise<string>;
}

export class UserLogger implements ForLoginingUser {
    constructor(private readonly authRepository: AuthRepository){}
    
    async login(user: User): Promise<string> {
        return await this.authRepository.login(user);
    }
}