import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtDecrypTool } from '../utils/InternalTools';
import { jwtConfig } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
@Module({
  imports: [JwtModule.register(jwtConfig), TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, JwtDecrypTool],
})
export class CourseModule {}
