import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Project } from './project.schema';


@Schema()
export class ProjectOwner extends Document {
    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: []})
    projects: Project[];
}

export const projectOwnerSchema = SchemaFactory.createForClass(ProjectOwner);