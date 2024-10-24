import {IsNumber, IsString, MinLength} from 'class-validator'

export class CarDto {
     // it nhat 5 ky tu > bao loi
     @MinLength(5,{message:'This field must be than 5 charracter!'})
     productName?:string;
 
     @IsString()
     price?:string;

     @IsNumber()
     category_id?:number;
}