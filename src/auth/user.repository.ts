import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentials: AuthCredentialsDTO): Promise<void> {
        const {username, password} = authCredentials;

        const user = new User();
        user.username = username;
        user.password = password;

        await user.save();
    }
}
