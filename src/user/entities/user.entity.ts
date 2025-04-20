/*
 * @FilePath: \nest-project\src\user\entities\user.entity.ts
 * @Description: desc
 * @LastEditors: tzy1997
 * @Author: tzy1997
 * @Version: 0.0.1
 * @Date: 2025-04-20 12:41:52
 * @LastEditTime: 2025-04-20 13:14:44
 * Copyright (c) 2025 by tzy1997, All Rights Reserved.
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  username: string = '';

  @Column()
  password: string = '';

  @Column()
  head_img: string = '';
}
