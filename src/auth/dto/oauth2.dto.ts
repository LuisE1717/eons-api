import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Oauth2Dto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}