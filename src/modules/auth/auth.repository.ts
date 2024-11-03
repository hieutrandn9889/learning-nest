import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayloadDto, AuthPermission, AuthResponseDto } from 'src/dto/auth.dto';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { Role } from 'src/global/globalEnum';
import { IAuthRepository } from 'src/interfaces/IAuthRepository';
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthRepository implements IAuthRepository {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(AccountsEntity)
        protected readonly repository: Repository<AccountsEntity>,
        private readonly jwtService:JwtService,
    ) {
    }


    async signIn(body: AuthPayloadDto): Promise<AuthPermission | boolean> {
        const {username, password} = body;

        // check username có tồn tại k
        const userAuth = await this.repository.findOne({where:{username}});
        if (!userAuth)  return false;
        const isMatch = await bcrypt.compare(password, userAuth.password)
        if(!isMatch) return false;

        // khởi tạo payload và sử dụng AuthResponseDto gởi về client thông tin, token
        const payload = {...new AuthResponseDto(userAuth)} ;   
        return new AuthPermission({
            id: userAuth.id,
            token: await this.jwtService.signAsync(payload),
            expiredTime: 900000
        })
        
    }

    async signUpAdmin(body: AuthPayloadDto): Promise<AuthResponseDto> {
        // Get username and password từ AuthPayloadDto
        const {username, password} = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt)
        return this.repository.save({
            username,
            password: hash,
            permission: Role.Admin
        })
    }
    
    async signUp(body: AuthPayloadDto): Promise<AuthResponseDto> {
        // Get username and password từ AuthPayloadDto
        const {username, password} = body;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt)
        return this.repository.save({
            username,
            password: hash,
            permission: Role.User
        })
    }
}