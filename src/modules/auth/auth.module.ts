import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsEntity } from "src/entities/cars.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { CarRepository } from "./auth.repository";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([CarsEntity])],
    controllers: [AuthController],
    providers: [AuthService,
        {
            useClass: CarRepository,
            provide: 'ICarRepository'
        }
    ]
})

export class CarModule { };