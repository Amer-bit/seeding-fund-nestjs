import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Project } from './project.schema';


@Schema()
export class ProjectOwner extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({default: []})
    projects: Project[];
}

export const projectOwnerSchema = SchemaFactory.createForClass(ProjectOwner);