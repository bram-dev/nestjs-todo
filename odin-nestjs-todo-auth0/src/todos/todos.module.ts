import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDosResolver } from './todos.resolver';
import { ToDosService } from './todos.service';
import { ToDo, ToDoSchema } from './schemas/todo.schema';

@Module({
  exports: [ToDosService],
  imports: [MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }])],
  providers: [ToDosService, ToDosResolver],
})
export class ToDosModule {}