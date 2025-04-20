import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config';
import { SecretTool, JwtDecrypTool } from '../utils/InternalTools';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, SecretTool, JwtDecrypTool],
})
export class UserModule {}
