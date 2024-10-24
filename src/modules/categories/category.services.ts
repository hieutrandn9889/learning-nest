import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/entities/categories.entity';
import { Category } from 'src/models/category.model';
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CategoryService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(CategoriesEntity) 
        private categoryRepository: Repository<CategoriesEntity>,
    ) {}

    // get all category
    async findAll(): Promise<Category[]> {
       return await this.categoryRepository.find();
    }

    // get a category
    async findById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne({where: {id}});
     }

    // create a category
    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.save(category);
     }

    // update a category
    async update(id: number, category: Category): Promise<Category> {

        // update xong rồi mới return
        await this.categoryRepository.update(id, category);

        // trả lại data mình mới update
        return await this.findById(id);
     }

    // delete a category
    async delete(id: number): Promise<boolean> {

        const isFlag: DeleteResult = await this.categoryRepository.delete(id);

        // trả lại data khi isFlag.affected === 1 
        // if (isFlag) {
        //     return true
        // }else{
        //     return false
        // }
        return isFlag.affected === 1;
     }
}