import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ProductOldService } from "./productOld.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { Product } from "src/models/product.model";
import { ProductDto } from "src/dto/product.dto";
import { Public } from "src/constant/decorator";

@Controller('productsOld')
export class ProductOldController {
    // create a constructor ProductService
    constructor(private readonly productService: ProductOldService) { }

    @Public()
    @Get()
    getProducts(): ResponseData<Product[]> {
        try {
            return new ResponseData<Product[]>(this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Public()
    @Post()
    createProduct(@Body() productDto: ProductDto): ResponseData<ProductDto> {

        try {
            // hứng request từ client (productDto) và ResponseData<Product> trả về 1 đối tượng 
            return new ResponseData<Product>(this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Public()
    @Get('/:id')
    // @Param('id') id:number ==> mang giá trị là string nên vào this.productService.detailProduct(id) nó đang string nên cần parse sang number
    detailProduct(@Param('id') id: number): ResponseData<Product> {
        try {
            return new ResponseData<Product>(this.productService.detailProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Public()
    @Put('/:id')
    // truyền 1 param id
    updateProducts(@Body() productDto: ProductDto, @Param('id') id: number): ResponseData<Product> {
        try {
            return new ResponseData<Product>(this.productService.updateProducts(productDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Public()
    @Delete('/:id')
    // hứng 1 param
    deleteProducts(@Param('id') id: number): ResponseData<boolean> {
        try {
            // nhan id
            return new ResponseData<boolean>(this.productService.deleteProducts(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}