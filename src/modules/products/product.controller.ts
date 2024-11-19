import { Controller, Get, Post, Put, Delete, Res, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.services';
import { Response } from 'express';
import { ResponseData } from "src/global/globalClass";
import { MetaParams, ResponseType } from 'src/constant/type';
import { Product } from '../../models/product.model';
import { ProductDto } from 'src/dto/product.dto';
import { HttpMessage, HttpStatus } from 'src/constant/enum';
import { Public } from 'src/constant/decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  getProducts(@Res() res: Response): ResponseType<Product> {
    try {
      return res.json(new ResponseData(this.productService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    }
  }

  @Public()
  @Post()
  createProduct(@Body() product: ProductDto, @Res() res: Response): ResponseType<Product> {
    try {
      return res.json(new ResponseData(this.productService.createProduct(product), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    }
  }

  @Public()
  @Get('/:id')
  detailProduct(@Param('id') id: number, @Res() res: Response): ResponseType<Product> {
    try {
      return res.json(new ResponseData(this.productService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    }
  }

  @Public()
  @Put('/:id')
  updateProduct(@Param('id') id: number, @Body() product: ProductDto, @Res() res: Response): ResponseType<Product> {
    try {
      return res.json(new ResponseData(this.productService.updateProduct(id, product), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    }
  }

  @Public()
  @Delete('/:id')
  deleteProduct(@Param('id') id: number, @Res() res: Response): ResponseType<Product> {
    try {
      return res.json(new ResponseData(this.productService.deleteProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    }
  }

  @Public()
  // nếu đặt /home thì nó sẽ trùng với /:id
  @Get('/home/pagination')
  getHomeProducts(
    @Query('page') page: string,
    @Query('search') search: string,
    @Res() res: Response,
  ): ResponseType<Product> {
    try {
      return res.json(new ResponseData(this.productService.findProductHome({ page, search }), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    } catch (error) {
      return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    }
  }
}