import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayloadDto, AuthPermission, AuthResponseDto } from 'src/dto/auth.dto';
import { AccountsEntity } from 'src/entities/accounts.entity';
import { Role } from 'src/global/globalEnum';
import { IAuthRepository } from 'src/interfaces/IAuthRepository';
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository implements IAuthRepository {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(AccountsEntity)
        protected readonly repository: Repository<AccountsEntity>,
    ) {
    }
    async signIn(body: AuthPayloadDto): Promise<AuthPermission | boolean> {
        return false;
    }

    async signUp(body: AuthPayloadDto): Promise<AuthResponseDto> {
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
}