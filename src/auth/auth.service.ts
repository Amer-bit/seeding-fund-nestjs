import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ProjectOwnerRegiseterDto } from './dto/project-owner.register.dto';

@Injectable()
export class AuthService {
    constructor(){}
    private database = [];
    async register(registerDto: ProjectOwnerRegiseterDto){
        const { username, email, password } = registerDto;
        let hashedPassword = await this.hashPassword(password);
        let userObj = {
            username,
            email,
            password: hashedPassword
        }

        this.database.push(userObj);
        return userObj;
    }


    private async hashPassword(password: string): Promise<string>{
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}
