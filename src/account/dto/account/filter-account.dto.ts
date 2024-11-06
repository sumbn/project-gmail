import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FilterAccountDto {
  @ApiProperty({ required: false })
  page?: string;

  @ApiProperty({ required: false })
  items_per_page?: string;

  @ApiProperty({ required: false })
  search?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'platformId must be a number' })
  platformId: string;
}
