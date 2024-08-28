import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { User } from 'src/user/persistence/entities/user.entity';
import { UserModel } from 'src/user/domain/models/user.model';
import { LoginDto } from 'src/auth/http-server/dtos/login.dto';

@Injectable()
export class AuthTypeOrmRepository implements AuthRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(loginDto: LoginDto): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return new UserModel({
      id: user.id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.roles,
    });
  }
}
