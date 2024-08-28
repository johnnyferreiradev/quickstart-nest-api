import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { IsPasswordValid } from 'src/common/decorators/password-validator.decorator';

export class CreateSuperUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPasswordValid()
  password: string;
}
