import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Public, Roles } from 'src/constant/decorator';
import { Role } from 'src/constant/enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginService } from './login.service';

export type SearchByNameReq = {
  name: string;
  page: number;
  pageSize: number;
};

@Controller('login')
export class LoginController {
  constructor(protected readonly loginService: LoginService) {}

  @Post('/')
  @Public()
  async login(@Body() body: { name: string }): Promise<any> {
    try {
      const roleRes = await this.loginService.login(body);
      return roleRes;
    } catch (error) {
      return null;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @Roles(Role.Admin)
  async profile(@Request() req: any): Promise<any> {
    return req.user;
  }

}
