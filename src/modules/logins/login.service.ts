import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/auth.dto';
import UserEntity from 'src/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class LoginService {
  constructor(
   @InjectRepository(UserEntity)
   protected readonly userRepo: Repository<UserEntity>,
   private readonly jwtService: JwtService,
  ) {}

 
  async login(body: { name: string }): Promise<any> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.name = :name', { name: body.name })
      .getOne();

    return {
      token: await this.jwtService.signAsync(new UserDto(user)),
      expiredTime: 900000,
    };
  }
  
}