import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CategoryModule } from './modules/categories/category.module';
import { CategoriesEntity } from './entities/categories.entity';
import { CarsEntity } from './entities/cars.entity';
import { AccountsEntity } from './entities/accounts.entity';
import { CarModule } from './modules/cars/car.module';
import { LogoModule } from './modules/logos/logo.module';
import { LogosEntity } from './entities/logos.entity';
import { BrandModule } from './modules/brands/brand.module';
import { ModelCarModule } from './modules/modelCars/modelCar.module';
import { ModelCarsEntity } from './entities/modelCars.entity';
import { ColorsEntity } from './entities/colors.entity';
import { ColorModule } from './modules/colors/color.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs-api-v1',
      entities: [CategoriesEntity, CarsEntity, AccountsEntity, LogosEntity,ModelCarsEntity,ColorsEntity],
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
    CarModule,
    LogoModule,
    BrandModule,
    ModelCarModule,
    ColorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}
