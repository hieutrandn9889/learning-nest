import { Controller, Get, Post, Put, Delete, Param, Body, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { AuthService } from "./auth.services";
import { AuthPayloadDto, AuthPermission, AuthResponseDto } from "src/dto/auth.dto";

//auth
@Controller('auth')
export class AuthController {

     //sử dụng serivce thì nhúng vào
     constructor(protected readonly authService: AuthService) { }

    //POST signIn
    @Post('/signIn')
    async signIn(@Body() auth: AuthPayloadDto, @Res() res: Response): Promise<ResponseType<AuthPermission | boolean>> {
        try {

            const isAuth = await this.authService.signIn(auth);
            if (!isAuth) {
                new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
            }
            return res.json(new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS);

        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

    // POST signUp
    @Post('/signUp')
    async signUp(@Body() auth: AuthPayloadDto, @Res() res: Response): Promise<ResponseType<AuthResponseDto | boolean>> {
        try {

            const isAuth = await this.authService.signUp(auth);
            if (!isAuth) {
                new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
            }
            return res.json(new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS);

        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }

}