import {IsString, MinLength} from 'class-validator'

export class LogoDto{

    // it nhat 5 ky tu > bao loi
    @MinLength(5,{message:'This field must be than 5 charracter!'})
    logoName?:string;

    @IsString()
    logoDescription?:string;
}