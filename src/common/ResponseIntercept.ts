/*
 * @FilePath: \nest-project\src\common\ResponseIntercept.ts
 * @Description: 响应拦截器
 * @LastEditors: tzy1997
 * @Author: tzy1997
 * @Version: 0.0.1
 * @Date: 2025-04-20 13:18:36
 * @LastEditTime: 2025-04-20 13:29:49
 * Copyright (c) 2025 by tzy1997, All Rights Reserved.
 */
import type {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Injectable } from '@nestjs/common';

interface SuccessResponse<T> {
  code: 0;
  data: T;
}

@Injectable()
export class ResponseIntercept<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 0,
          data,
        };
      }),
    );
  }
}
