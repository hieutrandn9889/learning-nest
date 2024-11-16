import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoleEntity from 'src/entities/role.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService {
  constructor(
   @InjectRepository(RoleEntity)
   protected readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async findAll(name: string): Promise<any> {

    /**
       * .createQueryBuilder('role') ==> role lấy từ đầu file role.entity.ts
       *
       *.leftJoinAndSelect('role.users', 'user') => trong role.entity.ts có users và ánh xạ đến user
    */
    const roleRes = await this.roleRepo
    .createQueryBuilder('role')
    .leftJoinAndSelect('role.users', 'user')

     /**
       * Nhiều câu query
       * 
       * .where('role.name LIKE :name', {name: `%${'ADMIN'}%`})
       * 
       * .andWhere('role.id = :id', {id:1})
       * 
       * .where('role.name LIKE :name AND role.id = :id', {name: `%${'ADMIN'}%`, id:1})
       *
       * .where('role.name LIKE :name', {name: `%${name}%`})
    */

    .where('role.name LIKE :name OR user.name LIKE :name', {name: `%${name}%`})

     /**
       * get list or one
       * 
       * .getMany();
       * 
       * .getOne();
    */
    .getOne();
    return roleRes;
  }
}