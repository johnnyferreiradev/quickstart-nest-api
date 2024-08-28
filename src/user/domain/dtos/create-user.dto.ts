import { Role } from "../enums/role.enum";

export interface CreateUserDto {
  name: string;
  username: string;
  password: string;
  roles: Role[];
}
