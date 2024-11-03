import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto, AuthPermission, AuthResponseDto } from 'src/dto/auth.dto';
import { IAuthRepository } from 'src/interfaces/IAuthRepository';

@Injectable()
export class AuthService {

   constructor(
      @Inject('IAuthRepository')
      protected readonly authRepository: IAuthRepository
   ) { }

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
      // authRepository với id, username, permission k phải optional
      const userDto: AuthResponseDto = new AuthResponseDto(await this.authRepository.signUp(auth));
      return userDto;
   }

   // signUpAdmin
   async signUpAdmin(auth: AuthPayloadDto): Promise<AuthResponseDto | boolean> {

      // toan tử ditractory
      const { username, password } = auth;

      //ĐK
      if (!username || !password) return false;

      // Khi signUp k có ID(AuthPayloadDto) nhưng trả về lại có ID(AuthResponseDto)
      // Tạo 1 đối tượng AuthResponseDto
      // authRepository với id, username, permission k phải optional
      const userDto: AuthResponseDto = new AuthResponseDto(await this.authRepository.signUpAdmin(auth));
      return userDto;
   }


}