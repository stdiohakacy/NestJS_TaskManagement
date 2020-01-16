import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.userRepository.signUp(authCredentialsDTO);
    }
}
