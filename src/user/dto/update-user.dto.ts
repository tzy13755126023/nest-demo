import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'id限制不可为空' })
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { message: 'id限制必须为数字' },
  )
  id: number;
  @IsNotEmpty({ message: 'username限制不能为空!!' })
  @IsString({ message: 'username限制为字符串类型!' })
  username: string;

  @IsString({ message: 'head_img限制必须为字符串' })
  head_img?: string;
}
