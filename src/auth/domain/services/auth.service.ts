import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UserModel } from 'src/user/domain/models/user.model';
import { AuthRepository } from 'src/auth/domain/repositories/auth.repository';
import { JwtRepository } from 'src/auth/domain/repositories/jwt.repository';

type AuthResult = {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthPersistenceRepository')
    private authRepository: AuthRepository,
    @Inject('JwtTokenRepository')
    private jwtRepository: JwtRepository,
  ) {}

  async signIn(loginDto: LoginDto): Promise<AuthResult> {
    const userModel = await this.authRepository.signIn(loginDto);
    const tokenPayload = {
      sub: userModel.id,
      username: userModel.username,
      roles: userModel.roles,
    };
    const accessToken =
      await this.jwtRepository.generateAccessToken(tokenPayload);
    const refreshToken =
      await this.jwtRepository.generateRefreshToken(tokenPayload);
    return {
      accessToken,
      refreshToken,
      user: userModel,
    };
  }

  async refreshToken(oldRefreshToken: string) {
    const decodedPayload =
      await this.jwtRepository.decodeRefreshToken(oldRefreshToken);
    const accessToken =
      await this.jwtRepository.generateAccessToken(decodedPayload);
    const refreshToken =
      await this.jwtRepository.generateRefreshToken(decodedPayload);
    return {
      accessToken,
      refreshToken,
    };
  }
}
