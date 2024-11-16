import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchByNameReq } from './page.controller';
import UserEntity from 'src/entities/user.entity';
import { UserDto } from 'src/dto/auth.dto';


@Injectable()
export class PageService {
  constructor(
   @InjectRepository(UserEntity)
   protected readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAllPage(req: SearchByNameReq): Promise<any> {   
    const {name, page = 1, pageSize = 10} = req;
    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0')
    }
    if (pageSize < 1) {
      throw new BadRequestException('Page size must be less than 10')
    }
    const query = await this.userRepo
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')

    /**
       * chạy lấy name thì dùng .andWhere và .getMany
       *
       * .andWhere('user.name LIKE :name ', {name: `%${name}%`})
       *      
       *.getMany()
    */ 

    if (name) {
      query.andWhere('user.name LIKE :name ', {name: `%${name}%`})
    }

    /**
       * lấy pageSize 10 cho page 1 và pageSize 11 cho page 2
       *
       * vd page = 1  => (1 - 1) * 10 => lấy 10 value page 1
       *      
       * vd page = 2  => (2 - 1) * 10 => lấy 11 value page 2
    */

    query.skip((page - 1) * pageSize).take(pageSize)

    const [users, total] = await query.getManyAndCount();
    const newUsers = users.map(item => new UserDto(item))
    
    return {
      list: newUsers,
      total,
      page:Number(page),
      pageSize:Number(pageSize)
    };
  }
}