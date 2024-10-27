import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { ModelCar } from "src/models/modelCar.model";
import { ModelCarService } from "./modelCar.services";
import { ModelCarDto } from "src/dto/modelCar.dto";

//modelCars
@Controller('modelCars')
export class ModelCarController {

    //sử dụng serivce thì nhúng vào
    constructor(private modelCarService: ModelCarService) { }

    @Get()
    // Res trả lại cho response
    // ở đây dùng async vì lấy data ở  db nên gây ra tình trạng bất đồng bộ nên sử dụng promise
    // ResponseType truyền model category
    async list(@Res() res: Response): Promise<ResponseType<ModelCar[]>> {
        try {
            return res.json(
                new ResponseData<ModelCar[]>(await this.modelCarService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData<ModelCar[]>(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Get('/:id')
    async detail(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<ModelCar>> {
        try {
            return res.json(
                new ResponseData(await this.modelCarService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    // tạo một category cần phải có dto đầu tiên
    @Post()
    async create(@Body(new ValidationPipe()) modelCar: ModelCarDto, @Res() res: Response): Promise<ResponseType<ModelCar>> {
        try {
            return res.json(
                new ResponseData(await this.modelCarService.create(modelCar), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Body(new ValidationPipe()) modelCar: ModelCarDto,
        @Res() res: Response): Promise<ResponseType<ModelCar>> {
        try {
            return res.json(
                new ResponseData(await this.modelCarService.update(id, modelCar), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Res() res: Response): Promise<ResponseType<ModelCar>> {
        try {
            const isFlag: boolean = await this.modelCarService.delete(id);
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