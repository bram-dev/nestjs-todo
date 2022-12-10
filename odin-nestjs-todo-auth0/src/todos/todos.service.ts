import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoInput } from './dto/update-todo.dto';
import { ToDo, ToDoDocument } from './schemas/todo.schema';

@Injectable()
export class ToDosService {
  constructor(
    @InjectModel(ToDo.name) private readonly todoModel: Model<ToDoDocument>,
  ) {}

  async create(createToDoDto: CreateToDoDto): Promise<ToDo> {
    const createdToDo = await this.todoModel.create(createToDoDto);
    return createdToDo;
  }

  async findAll(): Promise<ToDo[]> {
    return this.todoModel.find().populate('project').exec();
  }

  async findOneById(id: string): Promise<ToDo> {
    return this.todoModel.findOne({ _id: id }).populate('project').exec();
  }

  async update(id: string, updateToDoInput: UpdateToDoInput): Promise<ToDo> {
    const updatedToDo = (await this.todoModel
      .findByIdAndUpdate({ _id: id }, updateToDoInput))
      .save()
      return updatedToDo
  }

  async delete(id: string): Promise<ToDo> {
    const deletedToDo = await this.todoModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedToDo;
  }
}