import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/entities/categories.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.services";
import { CategoryRepository } from "./category.repository";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([CategoriesEntity])],
    controllers: [CategoryController],
    providers: [CategoryService,
        // sử dụng useClass vì inferface nằm ngoài modules folder
        {
            useClass: CategoryRepository,
            provide: 'ICategoryRepository'
        }
    ]
})

export class CategoryModule { };