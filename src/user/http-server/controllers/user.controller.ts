import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/http-server/guards/auth.guard';
import { UserService } from 'src/user/domain/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { PaginateOptionsDto } from 'src/common/dtos/paginate-options.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/user/domain/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateSuperUserDto } from '../dtos/create-super-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiPaginatedResponse(CreateUserDto)
  findAll(@Query() paginateOptionsDto: PaginateOptionsDto) {
    return this.userService.findAll(paginateOptionsDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Superuser)
  @Post('/superuser')
  createSuperUser(@Body() createSuperUserDto: CreateSuperUserDto) {
    return this.userService.createSuperUser(createSuperUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Superuser)
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Superuser)
  @Delete(':id/hard')
  hardDelete(@Param('id') id: string) {
    return this.userService.hardDelete(id);
  }
}
