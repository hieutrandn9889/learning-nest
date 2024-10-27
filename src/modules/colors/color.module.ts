import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ColorsEntity } from "src/entities/colors.entity";
import { ColorController } from "./color.controller";
import { ColorService } from "./color.services";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([ColorsEntity])],
    controllers: [ColorController],
    providers: [ColorService]
})

export class ColorModule { };