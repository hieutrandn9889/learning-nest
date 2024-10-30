import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { Car } from "src/models/car.model";
import { CarService } from "./car.services";
import { CarDto } from "src/dto/car.dto";

//cars
@Controller('cars')
export class CarController {

    //sử dụng serivce thì nhúng vào
    constructor(private readonly carService: CarService) { }


    // Get all car
    @Get()
    async list(@Res() res: Response): Promise<ResponseType<Car[]>> {
        try {
            return res.json(
                new ResponseData<Car[]>(await this.carService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData<Car[]>(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    // Get a car
    @Get('/:id')
    async detail(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Car>> {
        try {
            return res.json(
                new ResponseData(await this.carService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    //POST
    @Post()
    async create(@Body(new ValidationPipe()) car: CarDto, @Res() res: Response): Promise<ResponseType<Car>> {
        try {
            return res.json(
                new ResponseData(await this.carService.create(car), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Body(new ValidationPipe()) car: CarDto,
        @Res() res: Response): Promise<ResponseType<Car>> {
        try {
            return res.json(
                new ResponseData(await this.carService.update(id, car), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Res() res: Response): Promise<ResponseType<Car>> {
        try {
            const isFlag: boolean = await this.carService.delete(id);
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
                new ResponseData(await this.carService.findRelationById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

}