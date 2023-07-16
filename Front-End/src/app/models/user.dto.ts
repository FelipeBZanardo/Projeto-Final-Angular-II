import { Role } from '../constants/role.enum';

export interface UserDto {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: Role;
}
