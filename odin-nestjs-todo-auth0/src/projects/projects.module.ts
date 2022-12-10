import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDosModule } from 'src/todos/todos.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    ToDosModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  providers: [ProjectsService, ProjectsResolver],
})
export class ProjectsModule {}