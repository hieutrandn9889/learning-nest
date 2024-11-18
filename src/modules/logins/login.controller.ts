import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/constant/decorator';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(protected readonly loginService: LoginService) { }

  @Post('/')
  @Public()
  async login(@Body() body:{name: string}): Promise<any[]> {
    try {
      const roleRes = await this.loginService.login(body);
      return roleRes;
    } catch (error){
      return null;
    }
  }
} 

