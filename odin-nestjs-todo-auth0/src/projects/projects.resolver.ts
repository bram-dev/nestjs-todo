import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { Args, GqlExecutionContext, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Project } from '../graphql.schema';
import { ProjectsGuard } from './projects.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectInput } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';

const pubSub = new PubSub();

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Resolver('Project')
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) { }

  @UseGuards(GqlAuthGuard)
  @Query('projects')
  @UseGuards(ProjectsGuard)
  async getProjects() {
    return this.projectsService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query('project')
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<Project> {
    return this.projectsService.findOneById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createProject')
  async create(@Args('createProjectInput') args: CreateProjectDto): Promise<Project> {
    const createdProject = await this.projectsService.create(args);
    pubSub.publish('projectCreated', { projectCreated: createdProject });
    return createdProject;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateProject')
  update(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectsService.update(updateProjectInput.id, updateProjectInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removeProject')
  delete(@Args('id') id: string): Promise<Project> {
    return this.projectsService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription('projectCreated')
  ProjectCreated() {
    return pubSub.asyncIterator('projectCreated');
  }
}