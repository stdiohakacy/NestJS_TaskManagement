import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const {username, password} = authCredentialsDTO;
        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        const {username, password} = authCredentialsDTO;

        const user = new User();
        user.salt = await bcrypt.genSalt();
        user.username = username;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();    
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        return user;
    }
}
