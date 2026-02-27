import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { OrderItemRepository } from './order_item.repository';

@Module({
  providers: [OrderItemRepository],
  exports: [OrderItemRepository],
})
export class OrderItemModule {}
