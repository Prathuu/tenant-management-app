import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionCode } from './exception-codes';

export class AppException extends HttpException {
  constructor(
    message: string,
    public readonly code: ExceptionCode,
    status: HttpStatus,
    public readonly details?: any,
  ) {
    super(
      {
        success: false,
        message,
        code,
        details,
      },
      status,
    );
  }
}
