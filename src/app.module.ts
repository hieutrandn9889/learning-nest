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
import { BrandModule } from './modules/brands/brand.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './modules/auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs-api-v1',
      entities: [CategoriesEntity, CarsEntity, AccountsEntity],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions:{ expiresIn: 900000 }
    }),
    ProductModule,
    CategoryModule,
    CarModule,
    BrandModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
     // jwt for global
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
     // roles permission
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }

  ],
})

export class AppModule {
  constructor(private readonly dataSource: DataSource) { }
}
