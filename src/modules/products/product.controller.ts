import { Controller, Get, Post, Put, Delete } from "@nestjs/common";

@Controller('products')
export class ProductController{
    @Get()
    getProducts(): string {
        return 'GET LIST PRODUCTS';
    }
    @Post()
    createProduct(): string {
        return 'POST PRODUCT';
    }
    @Get('/:id')
    detailProduct(): string {
        return 'DETAIL PRODUCT';
    }
    @Put('/:id')
    updateProducts(): string {
        return 'UPDATE PRODUCT';
    }
    @Delete('/:id')
    deleteProducts(): string {
        return 'DELETE PRODUCT';
    }
}