import { IsEnum, IsMongoId, IsString, Length } from "class-validator";
import { ProjectStatus } from "src/project-owner/project-status.enum";

export class ChangeFundStatusDto{
    @IsMongoId()
    userId: string;

    @IsString()
    @Length(10, 10)
    projectId: string;

    @IsEnum(ProjectStatus)
    status: ProjectStatus;
}