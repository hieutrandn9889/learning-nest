import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorsEntity } from 'src/entities/colors.entity';
import { Color } from 'src/models/color.model';
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class ColorService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(ColorsEntity) 
        private colorRepository: Repository<ColorsEntity>,
    ) {}

    // get all color
    async findAll(): Promise<Color[]> {
       return await this.colorRepository.find();
    }

    // get a color
    async findById(id: number): Promise<Color> {
        return await this.colorRepository.findOne({where: {id}});
     }

    // create a color
    async create(color: Color): Promise<Color> {
        return await this.colorRepository.save(color);
     }

    // update a color
    async update(id: number, color: Color): Promise<Color> {

        // update xong rồi mới return
        await this.colorRepository.update(id, color);

        // trả lại data mình mới update
        return await this.findById(id);
     }

    // delete a color
    async delete(id: number): Promise<boolean> {

        const isFlag: DeleteResult = await this.colorRepository.delete(id);

        // trả lại data khi isFlag.affected === 1 
        // if (isFlag) {
        //     return true
        // }else{
        //     return false
        // }
        return isFlag.affected === 1;
     }
}