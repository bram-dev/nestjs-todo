import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';

export type ToDoDocument = HydratedDocument<ToDo>;

@Schema()
export class ToDo {
  @Prop()
  label: string;

  @Prop()
  saved: boolean;

  @Prop()
  priority: string;

  @Prop()
  date: string;

  @Prop()
  checked: boolean;

  @Prop()
  user_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId , ref: 'Project' })
  project: Project;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);