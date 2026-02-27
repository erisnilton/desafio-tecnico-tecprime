import { Knex } from 'knex';
import { InjectKnex } from 'src/database.module';
import { OrderItem } from './order_item.entity';
import { OrderItemModel } from './database/order_item.model';

export class OrderItemRepository {
  constructor(@InjectKnex() readonly knex: Knex) {}

  async createMany(orderItems: OrderItem[]) {
    await OrderItemModel.query().insert(
      orderItems.map((orderItem) => OrderItemModel.toDatabase(orderItem)),
    );
  }
}
