export const PaymentMethod = {
  CREDIT_CARD: "CREDIT_CARD",
  PIX: "PIX",
  TICKET: "TICKET",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export interface CreateOrderInput {
  name: string;
  email: string;
  address: string;
  payment_method: PaymentMethod;
  products: {
    product_id: string;
    quantity: number;
  }[];
  total: number;
}

export type UpdateOrderInput = Partial<CreateOrderInput & { id: string }>;

export interface OrderResponse {
  id: string;
  name: string;
  email: string;
  address: string;
  payment_method: PaymentMethod;
  status: string;
  total: string;
  created_at: string;
  updated_at: string;
}
