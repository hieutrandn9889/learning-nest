import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { Logo } from "src/models/logo.model";
import { LogoService } from "./logo.services";
import { LogoDto } from "src/dto/logo.dto";

//logos
@Controller('logos')
export class LogoController {

    //sử dụng serivce thì nhúng vào
    constructor(private logoService: LogoService) { }

    @Get()
    // Res trả lại cho response
    // ở đây dùng async vì lấy data ở  db nên gây ra tình trạng bất đồng bộ nên sử dụng promise
    // ResponseType truyền model category
    async list(@Res() res: Response): Promise<ResponseType<Logo[]>> {
        try {
            return res.json(
                new ResponseData<Logo[]>(await this.logoService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData<Logo[]>(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Get('/:id')
    async detail(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Logo>> {
        try {
            return res.json(
                new ResponseData(await this.logoService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    // tạo một category cần phải có dto đầu tiên
    @Post()
    async create(@Body(new ValidationPipe()) logo: LogoDto, @Res() res: Response): Promise<ResponseType<Logo>> {
        try {
            return res.json(
                new ResponseData(await this.logoService.create(logo), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    // PUT
    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body(new ValidationPipe()) logo: LogoDto,
        @Res() res: Response): Promise<ResponseType<Logo>> {
        try {
            return res.json(
                new ResponseData(await this.logoService.update(id, logo), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    // DELETE: nếu delete đc thì trả cho client là true còn k delete đc thì là false
    @Delete('/:id')
    async delete(
        @Param('id') id: number,
        @Res() res: Response): Promise<ResponseType<Logo>> {
        try {
            const isFlag: boolean = await this.logoService.delete(id);
            if (isFlag) {
                return res.json(
                    new ResponseData(isFlag, HttpStatus.SUCCESS, HttpMessage.SUCCESS),
                );
            } else {
                return res.json(
                    new ResponseData(isFlag, HttpStatus.ERROR, HttpMessage.ERROR),
                );
            }
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

}