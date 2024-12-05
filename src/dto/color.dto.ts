import {IsNumber, IsString, MinLength} from 'class-validator'

export class ColorDto {
     // it nhat 5 ky tu > bao loi
     @MinLength(5,{message:'This field must be than 5 charracter!'})
     colorName?:string;
 
     @IsString()
     colorDescription?:string;

     @IsNumber()
     car_id?:number;
}