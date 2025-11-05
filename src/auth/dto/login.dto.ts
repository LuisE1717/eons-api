import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LogOutData {
  @IsString()
  @IsNotEmpty()
  providerId: string;
}

export class LogOutDto {
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

// DTO para el reenvío de verificación de email
export class ResendVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  lang?: string;
}
