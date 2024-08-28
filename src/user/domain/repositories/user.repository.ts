import { PaginateOptionsDto } from 'src/common/domain/dtos/paginate-options.dto';
import { PaginateDto } from 'src/common/domain/dtos/paginate.dto';
import { UserModel } from '../models/user.model';

export interface UserRepository {
  findAll(
    paginateOptionsDto: PaginateOptionsDto,
  ): Promise<PaginateDto<UserModel>>;
  create(userModel: UserModel): Promise<UserModel>;
  findByUsername(username: string): Promise<UserModel>;
  update(userModel: UserModel): Promise<void>;
  createSuperUser(userModel: UserModel): Promise<UserModel>;
  softDelete(userId: string): Promise<void>;
  hardDelete(userId: string): Promise<void>;
}
