/*
 * @FilePath: \nest-project\src\course\entities\course.entity.ts
 * @Description: 课程实体
 * @LastEditors: tzy1997
 * @Author: tzy1997
 * @Version: 0.0.1
 * @Date: 2025-04-20 12:42:08
 * @LastEditTime: 2025-04-20 13:10:56
 * Copyright (c) 2025 by tzy1997, All Rights Reserved.
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = '';

  @Column()
  course_img: string = '';

  @Column()
  price: string = '';

  @Column()
  point: string = '';

  @Column()
  category: string = '';

  @Column()
  del: string = '';
}
