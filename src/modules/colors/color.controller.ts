import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus, Role } from "src/constant/enum";
import { ResponseType } from "src/constant/type";
import { ColorService } from "./color.services";
import { Roles } from "src/constant/decorator";
import { Color } from "src/models/color.model";
import { ColorDto } from "src/dto/color.dto";

//colors
@Controller('colors')
export class ColorController {

    //sử dụng serivce thì nhúng vào
    constructor(private readonly colorService: ColorService) { }

    // Get all color
    @Get()
    @Roles(Role.Admin, Role.User)
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

    // Get a color
    @Get('/:id')
    @Roles(Role.Admin, Role.User)
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
    async create(@Body(new ValidationPipe()) color: ColorDto, @Res() res: Response): Promise<ResponseType<Color>> {
        try {
            return res.json(
                new ResponseData(await this.colorService.create(color), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Body(new ValidationPipe()) color: ColorDto,
        @Res() res: Response): Promise<ResponseType<Color>> {
        try {
            return res.json(
                new ResponseData(await this.colorService.update(id, color), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
    @Get('/relations/:id')
    async findRelationById(@Param('id')id: number, @Res() res:Response){
        try {
            return res.json(
                new ResponseData(await this.colorService.findRelationById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

}