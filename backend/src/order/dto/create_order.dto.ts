import z from 'zod';
import { OrderStatus, PayamentMethod } from '../order.entity';

export const OrderCreateDTOSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  address: z.string().min(1),
  payment_method: z.enum(PayamentMethod).default(PayamentMethod.TICKET),
  status: z.enum(OrderStatus).default(OrderStatus.PENDING),
  products: z.array(z.object({ product_id: z.string(), quantity: z.number() })).min(1),
  total: z.number().min(1),
});

export type OrderCreateDTO = z.output<typeof OrderCreateDTOSchema>;
