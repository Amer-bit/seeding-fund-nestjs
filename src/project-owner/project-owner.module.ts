import { Module } from '@nestjs/common';
import { ProjectOwnerService } from './project-owner.service';
import { ProjectOwnerController } from './project-owner.controller';

@Module({
  providers: [ProjectOwnerService],
  controllers: [ProjectOwnerController]
})
export class ProjectOwnerModule {}
