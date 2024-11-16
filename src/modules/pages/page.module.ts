import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import UserEntity from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ UserEntity])],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}