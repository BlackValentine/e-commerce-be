import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { CoffeeProductEntity } from './entities/coffeeProduct.entity';
import { ProductService } from './services/product.service';
import { CoffeeInventoryEntity } from './entities/coffeeInventory.entity';
import { ProductCategoryEntity } from './entities/prouductCategory';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeInventoryEntity, CoffeeProductEntity, ProductCategoryEntity])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
