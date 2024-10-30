import { Inject, Injectable } from '@nestjs/common';
import { ICarRepository } from 'src/interfaces/ICarRepository';
import { Car } from 'src/models/car.model';

@Injectable()
export class CarService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @Inject('ICarRepository')
        private readonly carRepository: ICarRepository
    ) {}

    // get all car
    async findAll(): Promise<Car[]> {
       return await this.carRepository.findAll();
    }

    // get a car
    async findById(id: number): Promise<Car> {
        return await this.carRepository.findById(id);
     }

    // create a car
    async create(car: Car): Promise<Car> {
        return await this.carRepository.create(car);
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
        return await this.carRepository.delete(id);
     }

     async findRelationById(id: number): Promise<Car> {
        return await this.carRepository.findRelationById(id);
     }
}