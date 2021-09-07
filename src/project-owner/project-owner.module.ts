import { Module } from '@nestjs/common';
import { ProjectOwnerService } from './project-owner.service';
import { ProjectOwnerController } from './project-owner.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [ProjectOwnerService],
  controllers: [ProjectOwnerController]
})
export class ProjectOwnerModule {}
