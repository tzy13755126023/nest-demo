import { SecretTool } from './../utils/InternalTools';
import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly SecretTool: SecretTool,
    private readonly jwtService: JwtService,
  ) {}
  async create({
    username,
    password,
  }: CreateUserDto): Promise<{ msg: string; data?: string }> {
    try {
      // 检查用户是否存在
      const userRow = await this.userRepository.findOneBy({ username });
      if (userRow) {
        throw new BadRequestException('用户已存在！');
      }
      // 创建用户
      const user = await this.userRepository
        .save({
          username,
          password: this.SecretTool.getSecret(password),
          head_img: 'https://bu.dusays.com/2022/05/02/626f92e193879.jpg',
          del: '0',
        })
        .catch(() => {
          throw new InternalServerErrorException('用户创建失败');
        });
      return {
        msg: '注册成功',
        data: this.jwtService.sign({ id: user.id }),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('用户注册过程中发生未知错误');
    }
  }
  async login({ username, password }: CreateUserDto) {
    const userRow = await this.userRepository.findOneBy({ username });
    if (!userRow) {
      throw new BadRequestException('用户不存在！');
    }
    const passwordCheck =
      this.SecretTool.getSecret(password) === userRow.password;
    if (!passwordCheck) {
      throw new BadRequestException('密码错误！');
    }
    return {
      msg: '登录成功！',
      token: this.jwtService.sign({ id: userRow.id }),
    };
  }
  async findAll() {
    return await this.userRepository.findBy({ del: '0' });
  }
  async find(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: ['id', 'username', 'head_img'],
      });

      if (!user) {
        throw new NotFoundException(`用户ID ${id} 不存在`);
      }

      return {
        id: user.id,
        username: user.username,
        head_img: user.head_img || 'https://example.com/default-avatar.jpg',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('查询用户信息失败');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: DeleteUserDto) {
    return this.userRepository.update(id, { del: '1' });
  }
}
