import { Order } from '../../enums/order.enum';

export interface PaginateOptionsDto {
  readonly order?: Order;
  readonly page?: number;
  readonly take?: number;
  get skip(): number;
}
