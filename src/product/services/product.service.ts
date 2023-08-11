import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "../dtos/product.dto";
import { Inventory } from "../entities/inventory.entity";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>
  ) {}

  findAllProduct(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['inventories'],
    });
  }

  async createNewProduct(product: CreateProductDto): Promise<Product> {
    const response = await this.productRepository.save({
      ...product
    });
    const inventory = product.inventory.map(item => {
      return {
        ...item,
        product: response.id,
      };
    })
    await this.inventoryRepository.save(inventory);
    return response;
  }
}