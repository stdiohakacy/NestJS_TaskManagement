import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Controller, ValidationPipe, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
        return this.authService.signUp(authCredentialsDTO);
    }
    
}
