import { Injectable } from '@nestjs/common';
import { AuthPayloadDto, AuthPermission, AuthResponseDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {

   // signIn
   async signIn(auth: AuthPayloadDto): Promise<AuthPermission | boolean> {

      // toan tử ditractory
      const { username, password } = auth;

      //ĐK
      if (!username || !password) return false;
      const isAuth = await this.authRepository.signIn(auth);
      if (!isAuth) return false;
      return isAuth
   }

   // signUp
   async signUp(auth: AuthPayloadDto): Promise<AuthResponseDto | boolean> {

      // toan tử ditractory
      const { username, password } = auth;

      //ĐK
      if (!username || !password) return false;

      // Khi signUp k có ID(AuthPayloadDto) nhưng trả về lại có ID(AuthResponseDto)
      // Tạo 1 đối tượng AuthResponseDto
      const userDto: AuthResponseDto = new AuthResponseDto(await this.authRepository.signIn(auth));
      return userDto;
   }


}