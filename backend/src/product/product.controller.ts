import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserId } from 'src/auth/jwt.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('products')
export class ProductController {
  constructor(readonly ProductService: ProductService) {}

  @Get()
  async findAll() {
    return this.ProductService.findAll();
  }
}
