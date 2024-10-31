import { Inject, Injectable } from '@nestjs/common';
import { ICarRepository } from 'src/interfaces/ICarRepository';
import { Car } from 'src/models/car.model';

@Injectable()
export class AuthService {

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

   
}