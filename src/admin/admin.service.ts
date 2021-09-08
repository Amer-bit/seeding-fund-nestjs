import { Injectable } from '@nestjs/common';
import { ProjectOwner } from 'src/auth/schema/project-owner.schema';
import { UserRepository } from 'src/auth/user.repository';
import { ProjectStatus } from 'src/project-owner/project-status.enum';
import { ChangeFundStatusDto } from './dto/change-fund-status.dto';

@Injectable()
export class AdminService {
    constructor(private userRepo: UserRepository){}

    async viewFundRequest(): Promise<ProjectOwner[]>{
        const projectOwners = await this.userRepo.getAllUsersProjectsAndUsername();
        return projectOwners;
    }

    async changeFundStatus(changeFundStatusDto: ChangeFundStatusDto){
        await this.userRepo.changeProjectStatus(changeFundStatusDto);
    }

    async projectsStates(){
        const projectOwners = await this.viewFundRequest();
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
}
