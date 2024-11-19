import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/constant/enum";
import { Brand } from "src/models/brand.model";
import { BrandDto } from "src/dto/brand.dto";

@Controller('brands')
export class BrandController {
    // create a constructor ProductService
    constructor(private readonly brandService: BrandService) { }

    @Get()
    getBrands(): ResponseData<Brand[]> {
        try {
            return new ResponseData<Brand[]>(this.brandService.getBrands(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Brand[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    // @Param('id') id:number ==> mang giá trị là string nên vào this.productService.detailProduct(id) nó đang string nên cần parse sang number
    detailProduct(@Param('id') id: number): ResponseData<Brand> {
        try {
            return new ResponseData<Brand>(this.brandService.detailBrand(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Brand>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    createProduct(@Body() brandDto: BrandDto): ResponseData<BrandDto> {

        try {
            // hứng request từ client (productDto) và ResponseData<Product> trả về 1 đối tượng 
            return new ResponseData<Brand>(this.brandService.createBrand(brandDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Brand>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/:id')
    // truyền 1 param id
    updateProducts(@Body() brandDto: BrandDto, @Param('id') id: number): ResponseData<Brand> {
        try {
            return new ResponseData<Brand>(this.brandService.updateBrands(brandDto, id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Brand>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    // hứng 1 param
    deleteProducts(@Param('id') id: number): ResponseData<boolean> {
        try {
            // nhan id
            return new ResponseData<boolean>(this.brandService.deleteBrands(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<boolean>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}