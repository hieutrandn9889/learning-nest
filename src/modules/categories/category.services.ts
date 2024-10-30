import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/interfaces/ICategoryRepository';
import { Category } from 'src/models/category.model';

@Injectable()
export class CategoryService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @Inject('ICategoryRepository')

        // khởi tạo interface ICategoryRepository
        private readonly categoryRepository: ICategoryRepository
    ) {}

    // get all category
    async findAll(): Promise<Category[]> {
       return await this.categoryRepository.findAll();
    }

    // get a category
    async findById(id: number): Promise<Category> {
        return await this.categoryRepository.findById(id);
     }

    // create a category
    async create(category: Category): Promise<Category> {
        return await this.categoryRepository.create(category);
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
        // trả lại data khi isFlag.affected === 1 
        // if (isFlag) {
        //     return true
        // }else{
        //     return false
        // }
        return await this.categoryRepository.delete(id)
     }
}