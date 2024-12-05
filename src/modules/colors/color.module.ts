import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorController } from "./color.controller";
import { ColorService } from "./color.services";
import { ColorRepository } from "./color.repository";
import { ColorsEntity } from "src/entities/colors.entity";

@Module({
    
    // import cái colors entity vào trong color modules ==> sau đó gắn color module vào trong app module
    imports: [TypeOrmModule.forFeature([ColorsEntity])],
    controllers: [ColorController],
    providers: [ColorService,
        {
            useClass: ColorRepository,
            provide: 'IColorRepository'
        }
    ]
})

export class ColorModule { };