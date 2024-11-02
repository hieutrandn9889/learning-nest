import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsEntity } from "src/entities//accounts.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { AuthRepository } from "./auth.repository";

@Module({
    
    // import cái categories entity vào trong categories modules ==> sau đó gắn category module vào trong app module
    imports: [TypeOrmModule.forFeature([AccountsEntity])],
    controllers: [AuthController],
    providers: [AuthService,
        {
            useClass: AuthRepository,
            provide: 'IAuthRepository'
        }
    ]
})

export class AuthModule { };