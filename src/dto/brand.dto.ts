import {IsNotEmpty, IsString, MinLength} from 'class-validator'


export class BrandDto{
    @IsNotEmpty()
    categoryId?:number;

    // it nhat 5 ky tu > bao loi
    @MinLength(5,{message:'This field must be than 5 charracter!'})
    brandName?:string;

    @IsString()
    brandDescription?:string;
}