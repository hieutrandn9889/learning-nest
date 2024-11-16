import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductOldModule } from './modules/productsOld/productOld.module';
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
import { ProductModule } from './modules/products/product.module';
import { dataSourceOptions } from 'db/data-source';
import RoleEntity from './entities/role.entity';
import UserEntity from './entities/user.entity';
import { RoleModule } from './modules/roles/role.module';
import { PageModule } from './modules/pages/page.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'nestjs-api-v1',
    //   entities: [CategoriesEntity, CarsEntity, AccountsEntity],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      // import entities vào dataSourceOptions
      // vì dataSourceOptions là object
    ...dataSourceOptions,
    entities: [
      CategoriesEntity, 
      CarsEntity, 
      AccountsEntity,
      RoleEntity,
      UserEntity,
    ]
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions:{ expiresIn: 900000 }
    }),
    ProductOldModule,
    CategoryModule,
    CarModule,
    BrandModule,
    AuthModule,
    ProductModule,
    RoleModule,
    PageModule,
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
