import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { SALT_OF_ROUNDS } from 'src/common/configs/encrypt.config';
import { Role } from 'src/user/domain/enums/role.enum';

@Injectable()
export class SuperuserSeeder {
  private readonly logger = new Logger(SuperuserSeeder.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const name = process.env.SUPERUSER_NAME;
    const username = process.env.SUPERUSER_USERNAME;
    const plainPassword = process.env.SUPERUSER_PASSWORD;
    const roles = [Role.Superuser];

    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      this.logger.log('Superuser already exists, skipping creation.');
      return;
    }

    const hashedPassword = await bcrypt.hash(plainPassword, SALT_OF_ROUNDS);
    const newUser = this.userRepository.create({
      name,
      username,
      password: hashedPassword,
      roles,
    });

    await this.userRepository.save(newUser);
    this.logger.log('New user created successfully.');
  }
}
