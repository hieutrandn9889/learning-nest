import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelCarsEntity } from 'src/entities/modelCars.entity';
import { ModelCar } from 'src/models/modelCar.model';
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class ModelCarService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(ModelCarsEntity) 
        private modelCarRepository: Repository<ModelCarsEntity>,
    ) {}

    // get all modelCar
    async findAll(): Promise<ModelCar[]> {
       return await this.modelCarRepository.find();
    }

    // get a logo
    async findById(id: number): Promise<ModelCar> {
        return await this.modelCarRepository.findOne({where: {id}});
     }

    // create a logo
    async create(modelCar: ModelCar): Promise<ModelCar> {
        return await this.modelCarRepository.save(modelCar);
     }

    // update a logo
    async update(id: number, modelCar: ModelCar): Promise<ModelCar> {

        // update xong rồi mới return
        await this.modelCarRepository.update(id, modelCar);

        // trả lại data mình mới update
        return await this.findById(id);
     }

    // delete a logo
    async delete(id: number): Promise<boolean> {

        const isFlag: DeleteResult = await this.modelCarRepository.delete(id);

        // trả lại data khi isFlag.affected === 1 
        // if (isFlag) {
        //     return true
        // }else{
        //     return false
        // }
        return isFlag.affected === 1;
     }
}