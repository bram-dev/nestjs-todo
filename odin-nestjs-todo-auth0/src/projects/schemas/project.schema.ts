import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ToDo } from '../../todos/schemas/todo.schema';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  label: string;

  @Prop()
  saved: boolean;

  @Prop()
  user_id: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId , ref: 'ToDo' }])
  todos: ToDo[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);