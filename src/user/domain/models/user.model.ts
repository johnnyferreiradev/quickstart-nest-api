import { Role } from '../enums/role.enum';

export class UserModel {
  id?: string;
  name: string;
  username?: string;
  password?: string;
  roles?: Role[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.roles = user.roles;
  }
}
