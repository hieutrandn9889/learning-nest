import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from 'src/entities/cars.entity';
import { BaseRepository } from 'src/interfaces/BaseRepository';
import { ICarRepository } from 'src/interfaces/ICarRepository';
import { Repository } from "typeorm";

@Injectable()
export class CarRepository extends BaseRepository<CarsEntity, Repository<CarsEntity>> implements ICarRepository {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(CarsEntity) 
        protected readonly repository: Repository<CarsEntity>,
    ) {

        // do CarRepository đang extends BaseRepository nên dùng super để lấy hết tất cả thuộc tính từ BaseRepository
        super(repository);
    }
}