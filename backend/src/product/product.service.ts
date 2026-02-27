import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  #logger: Logger;
  #API_URL = 'https://dummyjson.com/products';
  #SELECT_FIELDS = 'id,title,description,price,stock,images';

  constructor(private readonly userService: UserService) {
    this.#logger = new Logger(ProductService.name);
  }

  async findAll() {
    try {
      this.#logger.log('Fetching products...');
      const response = await fetch(
        this.#API_URL + `?limit=30&select=${this.#SELECT_FIELDS}`,
      );
      const data = await response.json();

      return {
        items: data.products.map((product: any) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: product.images[0],
        })),
        count: data.total,
        skip: data.skip,
        limit: data.limit,
      };
    } catch (error) {
      this.#logger.error('Error fetching products:', error);
      throw error;
    }
  }
}
