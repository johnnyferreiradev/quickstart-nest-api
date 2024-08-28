import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { IsPasswordValid } from 'src/common/decorators/password-validator.decorator';
import { Role } from 'src/user/domain/enums/role.enum';

export class CreateUserDto {
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

  @ApiProperty()
  @IsArray({ message: 'roles must be an array' })
  @ArrayNotEmpty({ message: 'roles should not be empty' })
  @IsEnum(Role, {
    each: true,
    message: 'Each role must be a valid Role enum value',
  })
  roles: Role[];
}
