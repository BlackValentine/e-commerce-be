import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { Inventory } from './entities/inventory.entity';
import { Category } from './entities/category.entity';
import { S3Service } from './services/s3.service';
import { ConfigService } from '@nestjs/config';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, Product, Category]), NestjsFormDataModule],
  controllers: [ProductController],
  providers: [ProductService, S3Service, ConfigService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
