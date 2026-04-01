import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

type AnyObject = Record<string, any>;

@Injectable()
export class SerializeInterceptor<T = unknown> implements NestInterceptor<
  T,
  T
> {
  // 🔐 campos sensíveis
  private readonly blacklist = ['password', 'pin'];

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(map((data) => this.sanitize(data)));
  }

  private sanitize(data: unknown): T {
    if (data === null || data === undefined) return data as T;

    // ✅ NÃO mexer em tipos especiais
    if (
      data instanceof Date ||
      data instanceof Buffer ||
      typeof data === 'bigint'
    ) {
      return data as T;
    }

    // 🔹 array
    if (Array.isArray(data)) {
      return data.map((item) => this.sanitize(item)) as T;
    }

    // 🔹 objeto
    if (this.isObject(data)) {
      const cleaned = Object.fromEntries(
        Object.entries(data)
          // remove campos sensíveis
          .filter(([key]) => !this.blacklist.includes(key))
          // recursivo
          .map(([key, value]) => [key, this.sanitize(value)]),
      );

      return cleaned as T;
    }

    return data as T;
  }

  private isObject(value: unknown): value is AnyObject {
    return typeof value === 'object' && value !== null;
  }
}
