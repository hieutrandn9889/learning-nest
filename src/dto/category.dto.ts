import {IsString, MinLength} from 'class-validator'

export class CategoryDto{

    // it nhat 5 ky tu > bao loi
    @MinLength(5,{message:'This field must be than 5 charracter!'})
    categoryName?:string;

    @IsString()
    categoryDescription?:string;
}