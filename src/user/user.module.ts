import { Module } from '@nestjs/common';
import { UserTypeOrmRepository } from './persistence/repositories/user-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './persistence/entities/user.entity';
import { UserController } from './http-server/controllers/user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './domain/services/user.service';
import { SuperuserSeeder } from './persistence/seeds/super-user.seed';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserTypeOrmRepository,
    {
      provide: 'UserPersistenceRepository',
      useExisting: UserTypeOrmRepository,
    },
    SuperuserSeeder,
  ],
  exports: [UserService, UserTypeOrmRepository, 'UserPersistenceRepository'],
})
export class UserModule {
  constructor(private readonly superuserSeeder: SuperuserSeeder) {}

  async onModuleInit() {
    await this.superuserSeeder.seed();
  }
}
