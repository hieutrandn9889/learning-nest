import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/constant/enum";
import { ResponseType } from "src/constant/type";
import { Category } from "src/models/category.model";
import { CategoryService } from "./category.services";
import { CategoryDto } from "src/dto/category.dto";

//categories
@Controller('categories')
export class CategoryController {

    //sử dụng serivce thì nhúng vào
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    // Res trả lại cho response
    // ở đây dùng async vì lấy data ở  db nên gây ra tình trạng bất đồng bộ nên sử dụng promise
    // ResponseType truyền model category
    async list(@Res() res: Response): Promise<ResponseType<Category[]>> {
        try {
            return res.json(
                new ResponseData<Category[]>(await this.categoryService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData<Category[]>(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Get('/:id')
    async detail(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Category>> {
        try {
            return res.json(
                new ResponseData(await this.categoryService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    // tạo một category cần phải có dto đầu tiên
    @Post()
    async create(@Body(new ValidationPipe()) category: CategoryDto, @Res() res: Response): Promise<ResponseType<Category>> {
        try {
            return res.json(
                new ResponseData(await this.categoryService.create(category), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Body(new ValidationPipe()) category: CategoryDto,
        @Res() res: Response): Promise<ResponseType<Category>> {
        try {
            return res.json(
                new ResponseData(await this.categoryService.update(id, category), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
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
        @Res() res: Response): Promise<ResponseType<Category>> {
        try {
            const isFlag: boolean = await this.categoryService.delete(id);
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