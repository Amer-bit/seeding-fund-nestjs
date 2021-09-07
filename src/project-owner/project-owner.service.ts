import { Injectable } from '@nestjs/common';
import { ProjectOwner } from 'src/auth/schema/project-owner.schema';
import { Project } from 'src/auth/schema/project.schema';
import { UserRepository } from 'src/auth/user.repository';
import { CreateFundRequestDto } from './dto/create-fund-request.dto';
import { ProjectStatus } from './project-status.enum';

@Injectable()
export class ProjectOwnerService {
    constructor(private userRepo: UserRepository){}

    async createFundRequest(user: ProjectOwner, createFundRequest: CreateFundRequestDto): Promise<void>{
        const { name, sector, description } = createFundRequest;
        const project: Project = {
            name,
            sector,
            description,
            status: ProjectStatus.pending,
        }
        user.projects.push(project);
        this.userRepo.saveModel(user);
    }
}
