import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { Inventory } from './entities/inventory.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Product, Category])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
