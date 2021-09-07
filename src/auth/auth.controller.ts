import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('register')
    async register(@Body() registerDto: ProjectOwnerRegiseterDto):Promise<{accessToken}>{
        return this.authService.register(registerDto);
        
    }

    @Post('login')
    async logIn(@Body() loginDto: LoginDto): Promise<{accessToken}>{
        return this.authService.login(loginDto);
    }

    @Post('/admin/login')
    async adminLogIn(@Body() loginDto: LoginDto): Promise<{accessToken}>{
        return this.authService.adminLogin(loginDto);
    }
}
