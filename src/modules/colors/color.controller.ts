import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { Color } from "src/models/color.model";
import { ColorService } from "./color.services";
import { ColorDto } from "src/dto/color.dto";

//colors
@Controller('colors')
export class ColorController {

    //sử dụng serivce thì nhúng vào
    constructor(private colorService: ColorService) { }


    // Get all car
    @Get()
    async list(@Res() res: Response): Promise<ResponseType<Color[]>> {
        try {
            return res.json(
                new ResponseData<Color[]>(await this.colorService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData<Color[]>(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    // Get a car
    @Get('/:id')
    async detail(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Color>> {
        try {
            return res.json(
                new ResponseData(await this.colorService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    //POST
    @Post()
    async create(@Body(new ValidationPipe()) car: ColorDto, @Res() res: Response): Promise<ResponseType<Color>> {
        try {
            return res.json(
                new ResponseData(await this.colorService.create(car), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Body(new ValidationPipe()) car: ColorDto,
        @Res() res: Response): Promise<ResponseType<Color>> {
        try {
            return res.json(
                new ResponseData(await this.colorService.update(id, car), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Res() res: Response): Promise<ResponseType<Color>> {
        try {
            const isFlag: boolean = await this.colorService.delete(id);
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