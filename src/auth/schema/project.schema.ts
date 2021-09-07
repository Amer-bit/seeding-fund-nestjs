import { ProjectStatus } from '../../project-owner/project-status.enum';

export class Project {
    name: string;

    description: string;

    sector: string;

    status: ProjectStatus;
}