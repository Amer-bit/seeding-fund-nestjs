import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
    ){}

    async register(registerDto: ProjectOwnerRegiseterDto){
        return this.userRepo.register(registerDto);
    }

    // Verify user password and email and return 
    // accesstoken to be used for later requests
    async login(loginDto: LoginDto): Promise<{accessToken: string}>{
        const { email } = await this.userRepo.login(loginDto);
        if(!email) throw new UnauthorizedException("The email or password provided is invalid");
        const accessToken = await this.jwtService.signAsync({email});
        return {accessToken}; 
    }

    // Verify admin password and email and return 
    // accesstoken to be used for later requests
    async adminlogin(loginDto: LoginDto): Promise<{accessToken: string}>{
        const { email } = await this.userRepo.adminLogin(loginDto);
        if(!email) throw new UnauthorizedException("The email or password provided is invalid");
        const accessToken = await this.jwtService.signAsync({email});
        return {accessToken}; 
    }

}
