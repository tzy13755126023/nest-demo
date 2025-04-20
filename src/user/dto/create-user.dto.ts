import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username限制不能为空!!' })
  @IsString({ message: 'username限制为字符串类型!' })
  username: string;
  @IsNotEmpty({ message: 'password限制不能为空!!' })
  @IsString({ message: 'password限制为字符串类型!' })
  password: string;
}
