import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsNumber } from 'class-validator';

export class FilterAccountDto {
  @ApiProperty({ required: false })
  page?: string;

  @ApiProperty({ required: false })
  items_per_page?: string;

  @ApiProperty({ required: false })
  search?: string;

  @IsDefined({ message: 'platformId is required' })
  @Transform(({ value }) => Number(value))
  @IsNumber({ allowNaN: false }, { message: 'platformId must be a number' })
  platformId: string;

  /*
  @Transform(({obj}) => obj.firstName + " " + obj.lastName)
  @Expose()
  fullName
  */
}
