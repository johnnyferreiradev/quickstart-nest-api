import { PaginateMetaDto } from './paginate-meta.dto';

export interface PaginateDto<T> {
  readonly items: T[];
  readonly meta: PaginateMetaDto;
}
