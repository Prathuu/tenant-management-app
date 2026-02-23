import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse = {
      success: false,
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();

      if (typeof res === 'object') {
        errorResponse = {
          ...errorResponse,
          ...res,
          path: request.url,
          timestamp: new Date().toISOString(),
        };
      }
    }

    response.status(status).json(errorResponse);
  }
}
