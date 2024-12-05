import { Inject, Injectable } from '@nestjs/common';
import { IColorRepository } from 'src/interfaces/IColorRepository';
import { Color } from 'src/models/color.model';

@Injectable()
export class ColorService {

   //kết nối database => lấy data của categories entity => bắt buộc phải có resp của typeorm
   constructor(
      @Inject('IColorRepository')
      private readonly colorRepository: IColorRepository
   ) { }

   // get all color
   async findAll(): Promise<Color[]> {
      return await this.colorRepository.findAll();
   }

   // get a color
   async findById(id: number): Promise<Color> {
      return await this.colorRepository.findById(id);
   }

   // create a color
   async create(color: Color): Promise<Color> {
      return await this.colorRepository.create(color);
   }

   // update a color
   async update(id: number, color: Color): Promise<Color> {

      // update xong rồi mới return
      await this.colorRepository.update(id, color);

      // trả lại data mình mới update
      return await this.findById(id);
   }

   // delete a color
   async delete(id: number): Promise<boolean> {
      return await this.colorRepository.delete(id);
   }

   async findRelationById(id: number): Promise<Color> {
      return await this.colorRepository.findRelationById(id);
   }
}