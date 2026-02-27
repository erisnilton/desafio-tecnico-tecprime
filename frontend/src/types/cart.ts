import type { Product } from "../services/product/product.model";

export interface CartItem {
  product: Product;
  quantity: number;
}
