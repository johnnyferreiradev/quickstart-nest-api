import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenRefreshDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
