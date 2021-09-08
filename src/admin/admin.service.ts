import { Injectable } from '@nestjs/common';
import { ProjectOwner } from 'src/auth/schema/project-owner.schema';
import { UserRepository } from 'src/auth/user.repository';
import { ProjectStatus } from 'src/project-owner/project-status.enum';
import { ChangeFundStatusDto } from './dto/change-fund-status.dto';
import { ProjectFormatted } from './dto/project-formatted';

@Injectable()
export class AdminService {
    constructor(private userRepo: UserRepository){}

    async viewFundRequest(): Promise<ProjectFormatted[]>{
        const projectOwners = await this.getAllUsersProjectsAndUsername();
        return this.returnProjectsFormatted(projectOwners);
    }

    
    async changeFundStatus(changeFundStatusDto: ChangeFundStatusDto){
        return await this.userRepo.changeProjectStatus(changeFundStatusDto);
    }
    
    async projectsStates(){
        const projectOwners = await this.getAllUsersProjectsAndUsername();
        const chartStats =  {
            [ProjectStatus.pending]: 0,
            [ProjectStatus.accepted]: 0,
            [ProjectStatus.rejected]: 0,
        }
        for(const projectOwner of projectOwners){
            const projects = projectOwner.projects;
            for(const project of projects){
                chartStats[project.status]++;
            }
        }
        return chartStats;
    }
    
    private async getAllUsersProjectsAndUsername():Promise<ProjectOwner[]>{
        const projectOwners = await this.userRepo.getAllUsersProjectsAndUsername();
        return projectOwners;
    }

    private returnProjectsFormatted(projectOwners: ProjectOwner[]): ProjectFormatted[]{
        const projects = [];
        for(const projectOwner of projectOwners ){
            for(const dbProject of projectOwner.projects){
                const project = {} as ProjectFormatted
                project.username = projectOwner.username;
                project.userId = projectOwner._id;
                project.projectId = dbProject.id
                project.projectName = dbProject.name
                project.projectDescription = dbProject.description
                project.proejctSector = dbProject.sector
                project.projectStatus = dbProject.status
                projects.push(project);                
            }
        }
        
        return projects;
    }
}
