import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { UserModel } from 'src/user/domain/models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginateOptionsDto } from 'src/common/domain/dtos/paginate-options.dto';
import { PaginateDto } from 'src/common/domain/dtos/paginate.dto';
import { Role } from '../enums/role.enum';
import { CreateSuperUserDto } from '../dtos/create-super-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserPersistenceRepository')
    private userRepository: UserRepository,
  ) {}

  async findAll(
    paginateOptionsDto: PaginateOptionsDto,
  ): Promise<PaginateDto<UserModel>> {
    return await this.userRepository.findAll(paginateOptionsDto);
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const userModel = new UserModel({
      name: createUserDto.name,
      username: createUserDto.username,
      password: createUserDto.password,
      roles: createUserDto.roles,
    });
    return await this.userRepository.create(userModel);
  }

  async createSuperUser(
    createSuperUserDto: CreateSuperUserDto,
  ): Promise<UserModel> {
    const userModel = new UserModel({
      name: createSuperUserDto.name,
      username: createSuperUserDto.username,
      password: createSuperUserDto.password,
      roles: [Role.Superuser],
    });
    return await this.userRepository.createSuperUser(userModel);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const { name } = updateUserDto;
    const userModel = new UserModel({
      id,
      name,
    });
    await this.userRepository.update(userModel);
  }

  async findByUsername(username: string): Promise<UserModel> {
    return await this.userRepository.findByUsername(username);
  }

  async softDelete(userId: string): Promise<void> {
    return await this.userRepository.softDelete(userId);
  }

  async hardDelete(userId: string): Promise<void> {
    return await this.userRepository.hardDelete(userId);
  }
}
