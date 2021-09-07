import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import { Model } from "mongoose";
import { ChangeFundStatusDto } from "src/admin/dto/change-fund-status.dto";
import { LoginDto } from "./dto/login.dto";
import { ProjectOwnerRegiseterDto } from "./dto/project-owner.register.dto";
import { Admin } from "./schema/admin.schema";
import { ProjectOwner } from "./schema/project-owner.schema";
import { Project } from "./schema/project.schema";

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(ProjectOwner.name) private ownerModel: Model<ProjectOwner>,
        @InjectModel(Admin.name) private adminModel: Model<Admin>
    ){}

    async register(registerDto: ProjectOwnerRegiseterDto): Promise<{ email: string }>{
        const { email, password, username } = registerDto;
        const projectOwner = new this.ownerModel();
        projectOwner.email = email;
        projectOwner.username = username;
        const hashedPassword = await this.hashPassword(password);
        projectOwner.password = hashedPassword;
        await this.saveModel(projectOwner);
        return { email };

    }

    async login(loginDto: LoginDto): Promise<{ email: string }>{
        const { email, password } = loginDto;
        const projectOwner = await this.ownerModel.findOne({email});
        if(projectOwner){
            const passwordMatchCheck = await this.comparePassword(password, projectOwner.password);
            if(passwordMatchCheck){
                return { email: projectOwner.email };
            }
        }
        return { email: null };
    }

    async getAllUsersProjectsAndUsername(): Promise<ProjectOwner[]>{
        try {
            const projectOwners = await this.ownerModel.find().select({ username: 1, projects: 1})
            return projectOwners;
        } catch (error) {
            throw new InternalServerErrorException;
        }
    }

    async adminLogin(loginDto: LoginDto): Promise<{ email: string }>{
        const { email, password } = loginDto;
        const admin = await this.adminModel.findOne({email});
        if(admin){
            const passwordMatchCheck = this.comparePassword(password, admin.password);
            if(passwordMatchCheck){
                return { email: admin.email };
            }
        }
        return { email: null };
    }

    async changeProjectStatus(changeFundStatus: ChangeFundStatusDto){
        const { userId, projectId, status } = changeFundStatus;
        const projectOwner = await this.findProjectOwner(userId);
        if(!projectOwner) throw new NotFoundException('Project owner could not be found');
        for(let i = 0; i < projectOwner.projects.length; i++){
            if(projectOwner.projects[i].id === projectId){
                projectOwner.projects[i].status = status;
                projectOwner.markModified('projects');                                
                await this.saveModel(projectOwner);
                return;
            }
        }        
        throw new NotFoundException('Project could not be found');
    }

    private async findProjectOwner(userId: string): Promise<ProjectOwner>{
        try {
            const projectOwner = await this.ownerModel.findOne({_id: userId});
            return projectOwner;
        } catch (error) {
            throw new InternalServerErrorException;
        }
    }

    async saveModel(model: ProjectOwner | Admin):Promise<void>{
        try {
            await model.save();
          } catch (error) {
            console.error(error);
            const duplicateUserErrorMessage = 11000;
            if (error.code === duplicateUserErrorMessage)
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