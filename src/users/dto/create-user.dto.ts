import { isString } from 'util';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
