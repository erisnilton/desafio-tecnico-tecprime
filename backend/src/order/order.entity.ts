import { v7 as uuidv7 } from 'uuid';
import { nanoid } from 'nanoid';
import { OrderItem } from 'src/order_item/order_item.entity';

export enum PayamentMethod {
  PIX = 'PIX',
  CREDIT_CARD = 'CREDIT_CARD',
  TICKET = 'TICKET',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class Order {
  id: string;
  code: string;
  user_id: string;
  name: string;
  email: string;
  address: string;
  payment_method: PayamentMethod;
  status: OrderStatus;
  total: number;
  created_at: Date;

  constructor(
    order: Partial<Order> & {
      user_id: string;
      name: string;
      email: string;
      address: string;
      status: OrderStatus;
      payment_method: PayamentMethod;
      total: number;
    },
  ) {
    order.id ??= uuidv7();
    order.code ??= this.#generateCodeOrder();
    order.payment_method ??= PayamentMethod.TICKET;
    order.status ??= OrderStatus.PENDING;
    order.total ??= 0;
    Object.assign(this, order);
  }

  #generateCodeOrder() {
    return `PED-${nanoid(4).toUpperCase()}`;
  }
}
