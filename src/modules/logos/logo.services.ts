import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogosEntity } from 'src/entities/logos.entity';
import { Logo } from 'src/models/logo.model';
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class LogoService {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(LogosEntity) 
        private logoRepository: Repository<LogosEntity>,
    ) {}

    // get all logo
    async findAll(): Promise<Logo[]> {
       return await this.logoRepository.find();
    }

    // get a logo
    async findById(id: number): Promise<Logo> {
        return await this.logoRepository.findOne({where: {id}});
     }

    // create a logo
    async create(logo: Logo): Promise<Logo> {
        return await this.logoRepository.save(logo);
     }

    // update a logo
    async update(id: number, logo: Logo): Promise<Logo> {

        // update xong rồi mới return
        await this.logoRepository.update(id, logo);

        // trả lại data mình mới update
        return await this.findById(id);
     }

    // delete a logo
    async delete(id: number): Promise<boolean> {

        const isFlag: DeleteResult = await this.logoRepository.delete(id);

        // trả lại data khi isFlag.affected === 1 
        // if (isFlag) {
        //     return true
        // }else{
        //     return false
        // }
        return isFlag.affected === 1;
     }
}