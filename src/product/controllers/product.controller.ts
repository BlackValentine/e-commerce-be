import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductDto } from "../dtos/product.dto";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllProduct(): any {
    return this.productService.findAllProduct();
  }

  @Post()
  createNewProduct(@Body() product: CreateProductDto) {
    return this.productService.createNewProduct(product);
  }

}