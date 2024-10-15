import {IsNotEmpty, IsNumber, MinLength} from 'class-validator'


export class ProductDto{
    @IsNotEmpty()
    categoryId?:number;

    // it nhat 5 ky tu > bao loi
    @MinLength(5,{message:'This field must be than 5 charracter!'})
    productName?:string;

    @IsNumber()
    price?:number;
}