import { ApiProperty } from '@nestjs/swagger';
import { PaginateOptionsDto } from './paginate-options.dto';

export interface PageMetaDtoParameters {
  paginateOptionsDto: PaginateOptionsDto;
  itemCount: number;
}

export class PaginateMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ paginateOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = paginateOptionsDto.page;
    this.take = paginateOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
