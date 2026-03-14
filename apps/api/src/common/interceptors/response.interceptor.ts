import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // allow controller to return custom structure if needed
        if (data?.success !== undefined) {
          return data;
        }

        return {
          success: true,
          message: data?.message || 'Request successful',
          data: data?.data ?? data,
          meta: data?.meta ?? null,
        };
      }),
    );
  }
}
