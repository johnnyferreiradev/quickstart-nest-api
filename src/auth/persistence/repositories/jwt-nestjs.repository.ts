import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/auth/domain/dtos/token-payload.dto';
import { JwtRepository } from 'src/auth/domain/repositories/jwt.repository';
import { REFRESH_TOKEN_EXPIRES_IN } from 'src/common/configs/jwt.config';

@Injectable()
export class JwtNestjsRepository implements JwtRepository {
  constructor(private jwtService: JwtService) {}

  async generateAccessToken(tokenPayload: {
    sub: string;
    username: string;
  }): Promise<string> {
    return await this.jwtService.signAsync(tokenPayload);
  }

  async generateRefreshToken(tokenPayload: {
    sub: string;
    username: string;
  }) {
    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });
    return refreshToken;
  }

  async validateAccessToken(token: string): Promise<boolean> {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async decodeRefreshToken(oldRefreshToken: string): Promise<TokenPayload> {
    try {
      const decoded = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: process.env.JWT_SECRET,
      });
      return {
        sub: decoded.sub,
        username: decoded.username,
        roles: decoded.roles,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
