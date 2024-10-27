import {IsString, MinLength} from 'class-validator'

export class ModelCarDto{

    // it nhat 5 ky tu > bao loi
    @MinLength(5,{message:'This field must be than 5 charracter!'})
    modelCarName?:string;

    @IsString()
    modelCarDescription?:string;
}