import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UserId } from 'src/auth/jwt.decorator';
import { ZodValidationPipe } from 'src/@pipes/zod/zod_validation.pipe';
import {
  type OrderCreateDTO,
  OrderCreateDTOSchema,
} from './dto/create_order.dto';
import z from 'zod';

@Controller('/orders')
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @UserId() user_id: string,
    @Body(new ZodValidationPipe(OrderCreateDTOSchema))
    data: OrderCreateDTO,
  ) {
    return this.orderService.create(data, user_id);
  }

  @Get(':id')
  async getOrderById(@Param('id', new ZodValidationPipe(z.uuidv7())) id: string , @UserId() user_id: string) {
    return this.orderService.getById(id, user_id);
  }
}
