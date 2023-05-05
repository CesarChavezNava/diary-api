import { UserDto } from "../dtos";
import { ForLoginingUser, ForVeryfingAccessToken } from "../../application";
import { User } from "../../domain/entities";

export class AuthService {
    constructor(
        private readonly userLogger: ForLoginingUser,
        private readonly accessTokenVerifyer: ForVeryfingAccessToken
        ) {}

    async login(dto: UserDto): Promise<string> {
        return await this.userLogger.login(new User(dto.username, dto.password));
    }

    async verify(accessToken: string): Promise<boolean> {
        return await this.accessTokenVerifyer.verify(accessToken);
    }
}