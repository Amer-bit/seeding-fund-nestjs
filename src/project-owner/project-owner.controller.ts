import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectOwnerGuard } from 'src/auth/jwt.strategy';
import { ProjectOwner } from 'src/auth/schema/project-owner.schema';
import { CreateFundRequestDto } from './dto/create-fund-request.dto';
import { ProjectOwnerService } from './project-owner.service';

@Controller('projectowner')
@UseGuards(ProjectOwnerGuard)
export class ProjectOwnerController {
    constructor(
        private ownerService: ProjectOwnerService,
    ){}

    @Get('/viewfundrequest')
    async viewFundRequest(@Req() req){
        const currentUser: ProjectOwner = req.user;
        return currentUser.projects
    }

    @Post('/createfundrequest')
    async createFundRequest(@Body() createFundRequestDto: CreateFundRequestDto, @Req() req){
        const currentUser: ProjectOwner = req.user;
        this.ownerService.createFundRequest(currentUser, createFundRequestDto);
        return 'Project funding Request has been created';
    }
}
