import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dto/api-response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // ✅ SAFE extraction (handles JWT / Passport)
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res: any = exceptionResponse;

        message = Array.isArray(res.message)
          ? res.message[0]
          : res.message || exception.message;

        errors = res.errors || null;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json(new ApiResponse(false, message, null, errors));
  }
}
