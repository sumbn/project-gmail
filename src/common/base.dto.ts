import { Expose } from 'class-transformer';

export class BaseDto {
  @Expose()
  id?: string;

  createdAt?: string;

  updatedAt?: string;

  // static toInstance<T>(this: new () => T, obj: Partial<T>): T {
  //   return plainToInstance(this, obj, { excludeExtraneousValues: true });
  // }
}
