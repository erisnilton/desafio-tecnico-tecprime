import { v7 as uuidv7 } from 'uuid';
export class Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;

  constructor(
    data: Partial<Product> & {
      id: string;
      title: string;
      description: string;
      price: number;
      quantity: number;
      image: string;
      created_at: Date;
    },
  ) {
    data.id ??= uuidv7();
    data.created_at ??= new Date();
    Object.assign(this, data);
  }

  assign(data: Partial<Product>) {
    Object.assign(this, data);
  }
}
