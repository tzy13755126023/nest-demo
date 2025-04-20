import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtDecrypTool } from 'src/utils/InternalTools';
import { DeleteCourseDto } from './dto/delete-course.dto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtDecrypTool: JwtDecrypTool,
  ) {}

  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @Headers() header: { authorization: string },
  ) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(@Headers() herder: { authorization: string }) {
    this.jwtDecrypTool.getDecryp(herder.authorization);
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseService.findOne(+id);
  }

  @Put()
  update(
    @Body() updateCourseDto: UpdateCourseDto,
    @Headers() header: { authorization: string },
  ) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.update(updateCourseDto);
  }

  @Delete()
  remove(
    @Body() deleteCourseDto: DeleteCourseDto,
    @Headers() header: { authorization: string },
  ) {
    this.jwtDecrypTool.getDecryp(header.authorization);
    return this.courseService.remove(deleteCourseDto);
  }
}
