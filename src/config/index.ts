import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'tzy123456',
  database: 'nest-test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export const jwtConfig: JwtModuleOptions = {
  secret: 'nest-course',
  signOptions: { expiresIn: '7d' },
  global: true,
};
