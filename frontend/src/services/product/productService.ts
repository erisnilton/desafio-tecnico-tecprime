import { HttpService } from "../httpServices";
import type { Product } from "./product.model";

export class _ProductService extends HttpService {
  async fetchProducts(): Promise<Product[]> {
    return this.axios
      .request({
        method: "GET",
        url: "/products",
      })
      .then((res) => res.data.items);
  }
}

export const ProductService = new _ProductService();
