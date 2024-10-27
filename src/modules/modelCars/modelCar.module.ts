import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModelCarController } from "./modelCar.controller";
import { ModelCarService } from "./modelCar.services";
import { ModelCarsEntity } from "src/entities/modelCars.entity";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([ModelCarsEntity])],
    controllers: [ModelCarController],
    providers: [ModelCarService]
})

export class ModelCarModule { };