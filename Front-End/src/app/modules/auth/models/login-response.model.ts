import { Role } from "../../../constants/role.enum";

export interface LoginResponse {
    token: string;
    role: Role;
}