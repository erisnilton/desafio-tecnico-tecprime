import { BadRequestException, Logger, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  #logger = new Logger(ZodValidationPipe.name)
  constructor(private schema: ZodType<T>) {}
  async transform(value: unknown): Promise<T> {
    const result = await this.schema.safeParseAsync(value);
    if (result.success) {
      return result.data;
    }
    
    this.#logger.error('Zod validation error:', result.error.issues);
    throw new BadRequestException({
      message: 'Validation failed',
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        code: issue.code,
        message: issue.message,
      })),
    });
  }
}
