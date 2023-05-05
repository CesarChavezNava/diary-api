import { AuthRepository } from "../domain/repositories";

export interface ForVeryfingAccessToken {
    verify(accessToken: string): Promise<boolean>;
}

export class AccessTokenVerifyer implements ForVeryfingAccessToken {
    constructor(private readonly authRepository: AuthRepository) {}

    async verify(accessToken: string): Promise<boolean> {
        return await this.authRepository.verify(accessToken);
    }
}