import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// it is layout or format of the data we want to process
export class CreateUserModelDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
