import { Model } from 'objection';
import { Product } from 'src/product/product.entity';
import { ObjectChanges } from 'src/utils/object_changes';
import { removeUndefined } from 'src/utils/remove_undefined';
import { Order, OrderStatus, PayamentMethod } from '../order.entity';

export class OrderModel extends Model {
  static get tableName() {
    return 'order';
  }
  id: string;
  user_id: string;
  code: string;
  name: string;
  email: string;
  address: string;
  payment_method: PayamentMethod;
  status: OrderStatus;
  products: Product[];
  total: number;
  created_at: Date;

  static toDatabase(order: Partial<Order>) {
    return removeUndefined<OrderModel>({
      id: order.id,
      code: order.code,
      user_id: order.user_id,
      name: order.name,
      email: order.email,
      address: order.address,
      payment_method: order.payment_method,
      status: order.status,
      total: order.total,
      created_at: order.created_at,
    });
  }

  toEntity(): Order {
    return ObjectChanges.create(
      new Order({
        id: this.id,
        code: this.code,
        user_id: this.user_id,
        name: this.name,
        email: this.email,
        address: this.address,
        payment_method: this.payment_method,
        status: this.status,
        total: this.total,
        created_at: this.created_at,
      }),
    );
  }
}
