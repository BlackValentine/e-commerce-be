import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { Inventory } from './product/entities/inventory.entity';
import { Category } from './product/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpassword',
      database: 'two14coffee',
      entities: [Inventory, Product, Category],
      synchronize: true,
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    }),
    ConfigModule.forRoot(),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
