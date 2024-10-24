import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsEntity } from "src/entities/cars.entity";
import { CarController } from "./car.controller";
import { CarService } from "./car.services";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([CarsEntity])],
    controllers: [CarController],
    providers: [CarService]
})

export class CarModule { };