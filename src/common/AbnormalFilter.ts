/*
 * @FilePath: \nest-project\src\common\AbnormalFilter.ts
 * @Description: Global exception filter for handling HttpException
 * @LastEditors: tzy1997
 * @Author: tzy1997
 * @Version: 0.0.1
 * @Date: 2025-04-20 13:22:32
 * @LastEditTime: 2025-06-01 10:00:00
 * Copyright (c) 2025 by tzy1997, All Rights Reserved.
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

type ExceptionResponse =
  | string
  | {
      message?: string | string[];
      error?: string;
      statusCode?: number;
      [key: string]: any;
    };

@Catch(HttpException)
export class AbnormalFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    // 获取请求的上下文
    const ctx = host.switchToHttp();
    // 获取上下文的 response 对象
    const response = ctx.getResponse<Response>();
    // 获取异常的状态码
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;
    // Extract error message
    const message =
      this.extractErrorMessage(exceptionResponse) || 'Service error';
    response.status(status).json({
      code: -1,
      data: null,
      msg: message,
    });
  }

  /**
   * Extracts the error message from exception response
   * @param response The exception response object
   * @returns The extracted error message
   */
  private extractErrorMessage(response: ExceptionResponse): string | undefined {
    if (typeof response === 'string') {
      return response;
    }

    if (typeof response === 'object' && response.message) {
      if (Array.isArray(response.message)) {
        return response.message[0];
      }
      return response.message;
    }

    return undefined;
  }
}
