import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('regiester')
    async register(registerDto: ProjectOwnerRegiseterDto){
        return this.authService.register(registerDto);
    }

    @Get('login')
    async logIn(){
        
    }

    @Get('/admin/login')
    async adminLogIn(){

    }
}
