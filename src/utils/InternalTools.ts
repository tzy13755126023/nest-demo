import { BadRequestException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
//  md5 加密的工具
@Injectable()
export class SecretTool {
  getSecret(data: string) {
    return createHash('md5').update(data).digest('hex');
  }
}

interface DecodedToken {
  id: number;
  iat: number;
  exp: number;
  [key: string]: any;
}

// token 解密工具
@Injectable()
export class JwtDecrypTool {
  constructor(private readonly jwtService: JwtService) {}

  getDecryp(token: string) {
    let decodedToken: DecodedToken;
    try {
      decodedToken = this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException(error ?? '请先登录！');
    }
    if (!decodedToken) throw new BadRequestException('请先登录！');
    if (decodedToken.exp - decodedToken.iat <= 0) {
      throw new BadRequestException('登录已过期，请重新登录！');
    }
    return decodedToken.id;
  }
}
