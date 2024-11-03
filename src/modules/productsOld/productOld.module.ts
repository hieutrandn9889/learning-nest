import { Module } from "@nestjs/common";
import { ProductOldController } from "./productOld.controller";
import { ProductOldService } from "./productOld.service";

@Module({
    controllers:[ProductOldController],
    providers:[ProductOldService]
})

export class ProductOldModule{};