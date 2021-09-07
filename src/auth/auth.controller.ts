import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('register')
    async register(@Body() registerDto: ProjectOwnerRegiseterDto){
        this.authService.register(registerDto);
        return 'You have been regiesterd successfully';
    }

    @Post('login')
    async logIn(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Post('/admin/login')
    async adminLogIn(@Body() loginDto: LoginDto){
        return this.authService.adminLogin(loginDto);
    }
}
