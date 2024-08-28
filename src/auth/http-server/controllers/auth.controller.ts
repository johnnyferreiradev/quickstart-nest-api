import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PassportLocalGuard } from '../guards/passport-local.guard';
import { TokenRefreshDto } from '../dtos/token-refresh.tdo';
import { AuthService } from 'src/auth/domain/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return request.user;
  }

  @Post('refresh-token')
  refreshToken(@Body() tokenRefreshDto: TokenRefreshDto) {
    return this.authService.refreshToken(tokenRefreshDto.refreshToken);
  }
}
