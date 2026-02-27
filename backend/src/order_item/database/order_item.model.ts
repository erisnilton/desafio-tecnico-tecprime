import { Model } from 'objection';
import { removeUndefined } from 'src/utils/remove_undefined';
import { OrderItem } from '../order_item.entity';

export class OrderItemModel extends Model {
  static get tableName() {
    return 'order_items';
  }
  id: string;
  order_id: string;
  external_product_id: string;
  quantity: number;
  created_at: Date;

  static toDatabase(order: Partial<OrderItem>) {
    return removeUndefined<OrderItemModel>({
      id: order.id,
      order_id: order.order_id,
      external_product_id: order.product_id,
      quantity: order.quantity,
      created_at: order.created_at,
    });
  }
}
