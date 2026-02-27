import { Knex } from 'knex';
import { InjectKnex } from 'src/database.module';
import { Order } from './order.entity';
import { OrderModel } from './database/order.model';

export class OrderRepository {
  constructor(@InjectKnex() readonly knex: Knex) {}

  async create(order: Order) {
    await OrderModel.query().insert(OrderModel.toDatabase(order));
  }

  async findAll(user_id: string) {
    return OrderModel.query().where({ user_id });
  }

  async findById(id: string) {
    return OrderModel.query().findById(id);
  }
}
