import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.services";

@Module({
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([CategoriesEntity])],
    controllers: [CategoryController],
    providers: [CategoryService]
})

export class CategoryModule { };