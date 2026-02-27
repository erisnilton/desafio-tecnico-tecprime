import { OrderCreateDTO } from './dto/create_order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderItemRepository } from 'src/order_item/order_item.repository';
import { OrderItem } from 'src/order_item/order_item.entity';
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly userService: UserService,
  ) {}

  async create(input: OrderCreateDTO, user_id: string) {
    const user = await this.userService.ensureUser(user_id);
    const order = new Order({
      user_id: user.id,
      name: input.name,
      email: input.email,
      address: input.address,
      payment_method: input.payment_method,
      status: input.status,
      total: input.total,
    });

    const order_items = input.products.map((product) => {
      return new OrderItem({
        order_id: order.id,
        product_id: product.product_id,
        quantity: product.quantity,
      });
    });

    await this.orderRepository.create(order);
    await this.orderItemRepository.createMany(order_items);
    return {
      code: order.code,
    };
  }

  async getById(id: string, user_id: string) {
    await this.userService.ensureUser(user_id);
    return this.orderRepository.findById(id);
  }
}
