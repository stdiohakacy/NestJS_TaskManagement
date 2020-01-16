import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return await this.userRepository.signUp(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
        const username = await this.userRepository.signIn(authCredentialsDTO);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`);
        return {accessToken};
    }
}
