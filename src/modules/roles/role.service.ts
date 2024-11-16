import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RoleEntity from 'src/entities/role.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RoleService {
  constructor(
   @InjectRepository(RoleEntity)
   protected readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async findAll(): Promise<any> {
    // .createQueryBuilder('role') ==> role lấy từ đầu file role.entity.ts
    //.leftJoinAndSelect('role.users', 'user') => trong role.entity.ts có users và ánh xạ đến user
    const roleRes = await this.roleRepo
    .createQueryBuilder('role')
    .leftJoinAndSelect('role.users', 'user')
    .where('role.id = :id', {id:1})
    // get list
    // .getMany();
    // get one
    .getOne();
    return roleRes;
  }
}