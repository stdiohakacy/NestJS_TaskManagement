import { AuthCredentialsDTO } from './dto/auth-credentials-dto';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signUp(authCredentialsDTO);
    }
}
