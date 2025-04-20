import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DeleteCourseDto } from './dto/delete-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    await this.courseRepository.save({
      ...createCourseDto,
      del: '0',
    });
  }

  async findAll() {
    return await this.courseRepository.findBy({ del: '0' });
  }

  async findOne(id: number) {
    return await this.courseRepository.findBy({ id, del: '0' });
  }

  async update(updateCourseDto: UpdateCourseDto) {
    await this.courseRepository.update(updateCourseDto.id, updateCourseDto);
  }

  async remove(id: DeleteCourseDto) {
    await this.courseRepository.update(id, { del: '1' });
  }
}
