import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtDecrypTool } from './../utils/InternalTools';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtDecrypTool: JwtDecrypTool,
  ) {}
  @Post('create')
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  @Post('login')
  login(@Body() LoginDto: CreateUserDto) {
    return this.userService.login(LoginDto);
  }

  @Get()
  findAll(@Headers() header: { authorization: string }) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.userService.findAll();
  }
  @Get('find')
  find(@Headers() header: { authorization: string }) {
    return this.userService.find(
      this.jwtDecrypTool.getDecryp(header.authorization),
    );
  }

  @Put()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Headers() header: { authorization: string },
  ) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete()
  remove(
    @Body() deleteUserDto: DeleteUserDto,
    @Headers() header: { authorization: string },
  ) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.userService.remove(deleteUserDto);
  }
}
