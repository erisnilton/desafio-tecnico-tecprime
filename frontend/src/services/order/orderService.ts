import { HttpService } from "../httpServices";
import type { CreateOrderInput, OrderResponse } from "./order.model";

export class _OrderService extends HttpService {
  async createOrder(order: CreateOrderInput): Promise<{ code: string }> {
    return this.axios
      .request({
        method: "POST",
        url: "/orders",
        data: order,
      })
      .then((res) => res.data);
  }

  async findAllOrders(): Promise<OrderResponse[]> {
    return this.axios
      .request({
        method: "GET",
        url: "/orders",
      })
      .then((res) => res.data);
  }

  async findOrderById(id: string): Promise<OrderResponse> {
    return this.axios
      .request({
        method: "GET",
        url: `/orders/${id}`,
      })
      .then((res) => res.data);
  }
}

export const OrderService = new _OrderService();
