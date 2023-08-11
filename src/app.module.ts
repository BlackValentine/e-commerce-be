import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeProductEntity } from './product/entities/coffeeProduct.entity';
import { ProductModule } from './product/product.module';
import { CoffeeInventoryEntity } from './product/entities/coffeeInventory.entity';
import { ProductCategoryEntity } from './product/entities/prouductCategory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'two14coffee',
      entities: [CoffeeInventoryEntity, CoffeeProductEntity, ProductCategoryEntity],
      synchronize: true,
      dropSchema: true,
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
