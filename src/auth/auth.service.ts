import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Injectable()
export class AuthService {
    constructor(
        private authRepo: AuthRepository,
        private jwtService: JwtService,
    ){}

    async register(registerDto: ProjectOwnerRegiseterDto){
        return this.authRepo.register(registerDto);
    }

    // Verify user password and email and return 
    // accesstoken to be used for later requests
    async login(loginDto: LoginDto): Promise<{accessToken: string}>{
        const { email } = await this.authRepo.login(loginDto);
        if(!email) throw new UnauthorizedException("The email or password provided is invalid");
        const accessToken = await this.jwtService.signAsync({email});
        return {accessToken}; 
    }



}
