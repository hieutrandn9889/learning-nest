import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe } from "@nestjs/common";
import {ProductService} from "./product.service",
import {ResponseData} from "src/global/globalClass"
import {HttpMessage, HttpStatus} from "src/global/globalEnum"
import { Product } from "src/models/product.model";
import { ProductDto } from "src/dto/product.dto";

@Controller('products')
export class ProductController{
    // create a constructor ProductService
    constructor(private readonly productService:ProductService){}

    @Get()
    getProducts(): ResponseData<Product[]> {
        try {
            return new ResponseData<Product[]>( this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product[]>( null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    createProduct(@Body() productDto:ProductDto): ResponseData<ProductDto> {

        try {
            // hứng request từ client (productDto) và ResponseData<Product> trả về 1 đối tượng 
            return new ResponseData<Product>( this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>( null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    // @Param('id') id:number ==> mang giá trị là string nên vào this.productService.detailProduct(id) nó đang string nên cần parse sang number
    detailProduct(@Param('id') id:number): ResponseData<Product> {
        try {
            return new ResponseData<Product>( this.productService.detailProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>( null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
    
    @Put('/:id')
    // truyền 1 param id
    updateProducts(@Body() productDto:ProductDto, @Param('id') id: number): ResponseData<Product> {
        try {
            return new ResponseData<Product>( this.productService.updateProducts(productDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>( null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    deleteProducts(): ResponseData<string> {
        try {
            return new ResponseData<string>( this.productService.deleteProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<string>( null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}