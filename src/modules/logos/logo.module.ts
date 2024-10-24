import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogosEntity } from "src/entities/logos.entity";
import { LogoController } from "./logo.controller";
import { LogoService } from "./logo.services";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([LogosEntity])],
    controllers: [LogoController],
    providers: [LogoService]
})

export class LogoModule { };