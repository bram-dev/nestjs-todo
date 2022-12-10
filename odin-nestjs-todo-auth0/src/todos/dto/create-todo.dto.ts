import { CreateToDoInput } from '../../graphql.schema';

export class CreateToDoDto extends CreateToDoInput {
  label: string;
  date: string;
  priority: string;
  checked: boolean;
  saved: boolean;
  user_id: string;
  project: string;
}
