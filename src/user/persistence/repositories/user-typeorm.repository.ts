import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/user/domain/models/user.model';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { User } from 'src/user/persistence/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { PaginateOptionsDto } from 'src/common/domain/dtos/paginate-options.dto';
import { PaginateDto } from 'src/common/domain/dtos/paginate.dto';
import { PaginateMetaDto } from 'src/common/dtos/paginate-meta.dto';
import { PaginateDto as PaginateDtoClass } from 'src/common/dtos/paginate.dto';
import { SALT_OF_ROUNDS } from 'src/common/configs/encrypt.config';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(
    paginateOptionsDto: PaginateOptionsDto,
  ): Promise<PaginateDto<UserModel>> {
    const users = await this.userRepository.find({
      order: { createdAt: paginateOptionsDto.order },
      skip: paginateOptionsDto.skip,
      take: paginateOptionsDto.take,
    });

    const itemCount = await this.userRepository.count();

    const paginateMetaDto = new PaginateMetaDto({
      itemCount,
      paginateOptionsDto,
    });

    return new PaginateDtoClass(
      users.map(
        (user) =>
          new UserModel({
            id: user.id,
            name: user.name,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            roles: user.roles,
          }),
      ),
      paginateMetaDto,
    );
  }

  async create(userModel: UserModel): Promise<UserModel> {
    const passwordHash = await bcrypt.hash(userModel.password, SALT_OF_ROUNDS);

    try {
      const user = this.userRepository.create({
        name: userModel.name,
        username: userModel.username,
        password: passwordHash,
        roles: userModel.roles,
      });
      await this.userRepository.save(user);
      return new UserModel({
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: user.roles,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError && error.driverError.code === '23505') {
          throw new ConflictException('Username already exists.');
        }
        throw error;
      }
    }
  }

  async update(userModel: UserModel): Promise<void> {
    const result = await this.userRepository.update(userModel.id, {
      name: userModel.name,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userModel.id} not found`);
    }
  }

  async findByUsername(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserModel({
      id: user.id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async createSuperUser(userModel: UserModel): Promise<UserModel> {
    const passwordHash = await bcrypt.hash(userModel.password, SALT_OF_ROUNDS);

    try {
      const user = this.userRepository.create({
        name: userModel.name,
        username: userModel.username,
        password: passwordHash,
        roles: userModel.roles,
      });
      await this.userRepository.save(user);
      return new UserModel({
        id: user.id,
        name: user.name,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        roles: user.roles,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError && error.driverError.code === '23505') {
          throw new ConflictException('Username already exists.');
        }
        throw error;
      }
    }
  }

  async softDelete(userId: string): Promise<void> {
    const user = await this.userRepository.findBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(userId, { active: false });
  }

  async hardDelete(userId: string): Promise<void> {
    const user = await this.userRepository.findBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(userId);
  }
}
