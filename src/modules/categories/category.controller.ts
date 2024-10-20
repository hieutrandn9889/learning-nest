import { Controller, Get, Post, Put, Delete, Param, Body, Res } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { Category } from "src/models/category.model";
import { CategoryService } from "./category.services";

//categories
@Controller('categories')
export class CategoryController {

    //sử dụng serivce thì nhúng vào
    constructor(private categoryService: CategoryService) { }


    @Get()

    // Res trả lại cho response
    // ở đây dùng async vì lấy data ở  db nên gây ra tình trạng bất đồng bộ nên sử dụng promise
    // ResponseType truyền model category
    async list(@Res() res: Response): Promise<ResponseType<Category>> {
        try {
            return res.json(
                new ResponseData(await this.categoryService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        }
    }
}