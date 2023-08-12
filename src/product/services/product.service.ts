import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "../dtos/product.dto";
import { Inventory } from "../entities/inventory.entity";
import { Product } from "../entities/product.entity";
import { S3Service } from "./s3.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private readonly s3Service: S3Service,
  ) {}

  async findAllProduct(): Promise<Product[]> {
    const allProducts = await this.productRepository.find({
      relations: ['inventories'],
    });
    for (const product of allProducts) {
      product.image = await this.s3Service.getLinkMediaKey(product.image);
    }
    return allProducts;
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['inventories'],
    });
    product.image = await this.s3Service.getLinkMediaKey(product.image);
    if (product) {
      return product;
    } else {
      throw new HttpException('Product is not exist!!!', HttpStatus.BAD_REQUEST);
    }
  }

  async createNewProduct(product: CreateProductDto): Promise<Product> {
    try {
      const imageName = await this.s3Service.upload(product.image);
      const response = await this.productRepository.save({
        ...product,
        image: imageName,
      });
      const inventory = product.inventory.map((item) => {
        return {
          ...item,
          product: response.id,
        };
      });
      await this.inventoryRepository.save(inventory);
      return response;
    } catch (error) {
      console.log(error)
      throw new HttpException('Create product failed !!!', HttpStatus.BAD_REQUEST);
    }
  }
}