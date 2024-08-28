import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PaginateMetaDto } from './paginate-meta.dto';

export class PaginateDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly items: T[];

  @ApiProperty({ type: () => PaginateMetaDto })
  readonly meta: PaginateMetaDto;

  constructor(items: T[], meta: PaginateMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
