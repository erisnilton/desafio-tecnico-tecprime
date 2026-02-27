import { v7 as uuidv7 } from 'uuid';

export class OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  created_at: Date;

  constructor(
    data: Partial<OrderItem> & {
      order_id: string;
      product_id: string;
      quantity: number;
    },
  ) {
    data.id ??= uuidv7();
    data.created_at ??= new Date();
    Object.assign(this, data);
  }
}
