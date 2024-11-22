import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/constant/decorator';
import { RoleService } from './role.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { HttpMessage } from 'src/constant/enum';
import { extname, join } from 'path';
import {promises as fsPromises} from 'fs';

@Controller('roles')
export class RoleController {
  constructor(protected readonly roleService: RoleService) { }

  @Get('/')
  @Public()
  async list(@Query('name') name: string): Promise<any[]> {
    try {
      const roleRes = await this.roleService.findAll(name);
      return roleRes;
    } catch (error){
      return null;
    }
  }

  @Post('/upload')
  @Public()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:'./public',
        filename: (req, file, callback) =>{
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename)
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File){
    try {
      return{
        message:'File uploaded successfully!',
        filename: file.filename,
      }
    } catch (error) {
      return{
        message: HttpMessage.ERROR,
        filename: null,
      }
    }
  }

  @Post('/image/delete')
  @Public()
  async deleteFile(@Body() body:{filename: string}):Promise<any>{

    try {
      const filePath = join (__dirname, '..', 'public', body.filename);
      await fsPromises.unlink(filePath);
      return{
        message:'File uploaded successfully!',
        filename: body.filename,
      }

    } catch (error) {
      return{
        message: HttpMessage.ERROR,
        filename: null,
      }
    }
  }


} 

