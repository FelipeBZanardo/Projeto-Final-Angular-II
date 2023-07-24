import { Role } from "../../../constants/role.enum";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
}
