import { Injectable } from '@nestjs/common';
import { ProjectOwner } from 'src/auth/schema/project-owner.schema';
import { UserRepository } from 'src/auth/user.repository';
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
}
