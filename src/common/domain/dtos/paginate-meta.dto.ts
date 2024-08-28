import { PaginateOptionsDto } from './paginate-options.dto';

export interface PageMetaDtoParameters {
  paginateOptionsDto: PaginateOptionsDto;
  itemCount: number;
}

export interface PaginateMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}
