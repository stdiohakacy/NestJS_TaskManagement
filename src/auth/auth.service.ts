import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return await this.userRepository.signUp(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const user = await this.userRepository.signIn(authCredentialsDTO);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
