import { Controller, Post } from '@nestjs/common';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Controller()
export class AuthController {

    @Post('regiester')
    async register(registerDto: ProjectOwnerRegiseterDto){
        
    }
}
