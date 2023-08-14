import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { CreateProductDto } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";
import { S3Service } from "../services/s3.service";

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService, private s3Service: S3Service) {}

  @Get()
  findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post()
  @FormDataRequest()
  createNewProduct(@Body() product: CreateProductDto) {
    return this.productService.createNewProduct(product);
  }
}