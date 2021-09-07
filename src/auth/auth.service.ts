import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';
import { JwtPayload } from "./access-token-payload";

@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
    ){}

    async register(registerDto: ProjectOwnerRegiseterDto){
        return await this.userRepo.register(registerDto);
    }

    // Verify user password and email and return 
    // accesstoken to be used for later requests
    async login(loginDto: LoginDto): Promise<{accessToken: string}>{
        const { email } = await this.userRepo.login(loginDto);
        if(!email) throw new UnauthorizedException("The email or password provided is invalid");
        const payload : JwtPayload = {email};
        const accessToken = await this.jwtService.signAsync(payload);
        return {accessToken}; 
    }

    // Verify admin password and email and return 
    // accesstoken to be used for later requests
    async adminLogin(loginDto: LoginDto): Promise<{accessToken: string}>{
        const { email } = await this.userRepo.adminLogin(loginDto);
        if(!email) throw new UnauthorizedException("The email or password provided is invalid");
        const payload : JwtPayload = {email};
        const accessToken = await this.jwtService.signAsync(payload);
        return {accessToken}; 
    }

}
