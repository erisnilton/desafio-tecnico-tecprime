import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemModule } from 'src/order_item/order_item.module';

@Module({
  imports: [UserModule, OrderItemModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
