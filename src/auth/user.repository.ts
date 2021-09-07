import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dto";
import { ProjectOwnerRegiseterDto } from "./dto/project-owner.register.dto";
import { ProjectOwner } from "./schema/project-owner.schema";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(ProjectOwner.name) private ownerModel: Model<ProjectOwner>,
    ){}

    async register(registerDto: ProjectOwnerRegiseterDto): Promise<void>{
        const { email, password, username } = registerDto;
        const projectOwner = new this.ownerModel();
        projectOwner.email = email;
        projectOwner.username = username;
        const hashedPassword = await this.hashPassword(password);
        projectOwner.password = hashedPassword;
        this.saveModel(projectOwner);
    }

    async login(loginDto: LoginDto): Promise<{email: string }>{
        const { email, password } = loginDto;
        const projectOwner = await this.ownerModel.findOne({email});
        if(projectOwner){
            const passwordMatchCheck = this.comparePassword(password, projectOwner.password);
            if(passwordMatchCheck){
                return { email: projectOwner.email };
            }
        }
        return { email: null };
    }

    async saveModel(model: ProjectOwner):Promise<void>{
        try {
            await model.save();
          } catch (error) {
            console.error(error);
            if (error.code === 11000)
              throw new ConflictException('The provided email is already in use');
            else throw new InternalServerErrorException();
          }
    }

    private async comparePassword(
        userProvidedPassword:string,
        dbPassword: string,
    ): Promise<boolean>{
        return bcrypt.compare(userProvidedPassword, dbPassword);
    }

    private async hashPassword(password: string): Promise<string>{
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}