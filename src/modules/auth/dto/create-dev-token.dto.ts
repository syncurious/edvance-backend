import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDevTokenDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  @MaxLength(320)
  email: string;

  @ApiProperty({ example: 'test-password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1024)
  password: string;
}
