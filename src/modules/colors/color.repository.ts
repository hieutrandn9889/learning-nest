import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorsEntity } from 'src/entities/colors.entity';
import { BaseRepository } from 'src/interfaces/BaseRepository';
import { IColorRepository } from 'src/interfaces/IColorRepository';
import { Color } from 'src/models/color.model';
import { Repository } from "typeorm";

@Injectable()
export class ColorRepository extends BaseRepository<ColorsEntity, Repository<ColorsEntity>> implements IColorRepository {

    //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
    constructor(
        @InjectRepository(ColorsEntity) 
        protected readonly repository: Repository<ColorsEntity>,
    ) {

        // do ColorRepository đang extends BaseRepository nên dùng super để lấy hết tất cả thuộc tính từ BaseRepository
        super(repository);
    }
    async findRelationById(id: number): Promise<Color> {
        return await this.repository.findOne({where:{id}, relations:['car']});
    }
}