import { Module } from '@nestjs/common';
import { AuthController } from './http-server/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/persistence/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './http-server/strategies/local.strategy';
import { AuthService } from './domain/services/auth.service';
import { AuthTypeOrmRepository } from './persistence/repositories/auth-typeorm.repository';
import { JwtNestjsRepository } from './persistence/repositories/jwt-nestjs.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthPersistenceRepository',
      useClass: AuthTypeOrmRepository,
    },
    {
      provide: 'JwtTokenRepository',
      useClass: JwtNestjsRepository,
    },
    LocalStrategy,
  ],
  exports: [AuthService, 'AuthPersistenceRepository', 'JwtTokenRepository'],
})
export class AuthModule {}
