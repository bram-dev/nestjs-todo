import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import { UpdateProjectInput } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = await this.projectModel.create(createProjectDto);
    return createdProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().populate('todos').exec();
  }

  async findOneById(id: string): Promise<Project> {
    return this.projectModel.findOne({ _id: id }).populate('todos').exec();
  }

  async update(id: string, updateProjectInput: UpdateProjectInput): Promise<Project> {
    const updatedProject = (await this.projectModel
      .findByIdAndUpdate({ _id: id }, updateProjectInput))
      .save()
    return updatedProject
  }

  async delete(id: string) {
    const deletedProject = await this.projectModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedProject;
  }
}
