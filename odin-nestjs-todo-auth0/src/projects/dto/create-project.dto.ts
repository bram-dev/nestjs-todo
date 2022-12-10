import { CreateProjectInput, ToDo } from '../../graphql.schema';

export class CreateProjectDto extends CreateProjectInput {
  label: string;
  saved: boolean;
  user_id: string;
}
