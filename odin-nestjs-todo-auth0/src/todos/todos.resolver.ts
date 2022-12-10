import { ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { Args, GqlExecutionContext, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ToDo } from '../graphql.schema';
import { ToDosGuard } from './todos.guard';
import { ToDosService } from './todos.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoInput } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';

const pubSub = new PubSub();

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Resolver('ToDo')
export class ToDosResolver {
  constructor(private readonly todosService: ToDosService) {}

  @UseGuards(GqlAuthGuard)
  @Query('todos')
  @UseGuards(ToDosGuard)
  async getToDos() {
    return this.todosService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query('todo')
  async findOneById(
    @Args('id')
    id: string,
  ): Promise<ToDo> {
    return this.todosService.findOneById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('createToDo')
  async create(@Args('createToDoInput') args: CreateToDoDto): Promise<ToDo> {
    const createdToDo = await this.todosService.create(args);
    pubSub.publish('todoCreated', { todoCreated: createdToDo });
    return createdToDo;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateToDo')
  update(@Args('updateToDoInput') updateToDoInput: UpdateToDoInput) {
    return this.todosService.update(updateToDoInput.id, updateToDoInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('removeToDo')
  delete(@Args('id') id: string) {
    return this.todosService.delete(id);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription('todoCreated')
  ToDoCreated() {
    return pubSub.asyncIterator('todoCreated');
  }
}