import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ExceptionCode } from './exception-codes';
import { AppException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      case 'P2002':
        throw new AppException(
          'Resource already exists',
          ExceptionCode.DUPLICATE_RESOURCE,
          HttpStatus.CONFLICT,
        );

      case 'P2025':
        throw new AppException(
          'Resource not found',
          ExceptionCode.RESOURCE_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );

      default:
        throw new AppException(
          'Database error',
          ExceptionCode.INTERNAL_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
