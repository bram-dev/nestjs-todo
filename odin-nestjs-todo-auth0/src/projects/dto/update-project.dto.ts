import { CreateProjectInput } from '../../graphql.schema';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  id: string;
  todos: string[];
}