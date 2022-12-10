import { CreateToDoInput } from '../../graphql.schema';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateToDoInput extends PartialType(CreateToDoInput) {
  id: string;
}