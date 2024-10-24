import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from 'src/entities/cars.entity';
import { Car } from 'src/models/car.model';
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CarService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(CarsEntity) 
        private carRepository: Repository<CarsEntity>,
    ) {}

    // get all car
    async findAll(): Promise<Car[]> {
       return await this.carRepository.find();
    }

    // get a car
    async findById(id: number): Promise<Car> {
        return await this.carRepository.findOne({where: {id}});
     }

    // create a car
    async create(car: Car): Promise<Car> {
        return await this.carRepository.save(car);
     }

    // update a car
    async update(id: number, car: Car): Promise<Car> {

        // update xong rồi mới return
        await this.carRepository.update(id, car);

        // trả lại data mình mới update
        return await this.findById(id);
     }

    // delete a car
    async delete(id: number): Promise<boolean> {

        const isFlag: DeleteResult = await this.carRepository.delete(id);

        // trả lại data khi isFlag.affected === 1 
        // if (isFlag) {
        //     return true
        // }else{
        //     return false
        // }
        return isFlag.affected === 1;
     }
}