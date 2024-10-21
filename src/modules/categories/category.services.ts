import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { Category } from 'src/models/category.model';
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(CategoriesEntity) 
        private categoryRepository: Repository<CategoriesEntity>,
    ) {}

    // lấy tất cả danh sách của category
    async findAll(): Promise<Category[]> {
       return await this.categoryRepository.find();
    }

    // lấy từng id của category
    async findById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({where: {id}});
     }
}