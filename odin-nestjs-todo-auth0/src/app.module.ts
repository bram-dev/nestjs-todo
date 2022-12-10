import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ToDosModule } from './todos/todos.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    ToDosModule,
    ProjectsModule,
    MongooseModule.forRoot('mongodb+srv://bram-dev:e0iosk7M0iFPhxN3@bram-dev-cluster.aphwvmd.mongodb.net/?retryWrites=true&w=majority'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: false,
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthzModule,
  ],
})
export class AppModule {}
