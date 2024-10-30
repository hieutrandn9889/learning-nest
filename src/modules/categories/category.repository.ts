import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { BaseRepository } from 'src/interfaces/BaseRepository';
import { ICategoryRepository } from 'src/interfaces/ICategoryRepository';
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository extends BaseRepository<CategoriesEntity, Repository<CategoriesEntity>> implements ICategoryRepository {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(CategoriesEntity) 
        protected readonly repository: Repository<CategoriesEntity>,
    ) {

        // do CarRepository đang extends BaseRepository nên dùng super để lấy hết tất cả thuộc tính từ BaseRepository
        super(repository);
    }
}