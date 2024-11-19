import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationAccountDto {
  @ApiProperty({ required: false })
  page: string;

  @ApiProperty({ required: false })
  items_per_page: string;

  @ApiProperty({ required: false })
  search: string;

  @IsNotEmpty({ message: 'platformId is not empty' })
  platformId: string;

  /*
  @Transform(({obj}) => obj.firstName + " " + obj.lastName)
  @Expose()
  fullName
  */
}
