import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProjectStatus } from '../../project-owner/project-status.enum';


@Schema()
export class Project {

    @Prop({ 
        type: String,
        required: true,
        unique: true,
        sparse: true,
    })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    sector: string;

    @Prop({ required: true, enum: ProjectStatus })
    status: ProjectStatus;
}

export const projectSchema = SchemaFactory.createForClass(Project);