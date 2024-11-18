import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseDto } from './base.dto';
import { MyBaseEntity } from './mysql/base.entity';
import { GenericService } from './mysql/base.service';

export class BaseController<Entity extends MyBaseEntity, Dto extends BaseDto> {
  constructor(
    private readonly service: GenericService<Entity>,
    private readonly dtoClass: new () => Dto,
  ) {}

  @Post()
  async create(@Body() dto: Dto): Promise<Dto> {
    return this.service.save(dto, this.dtoClass);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Dto,
  ): Promise<{ result: string }> {
    return this.service.update(id, dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Dto> {
    return this.service.findOne(id, this.dtoClass);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ result: string }> {
    return this.service.deleteById(id);
  }

  @Get()
  async getAll() {
    return await this.service.findAll(this.dtoClass);
  }
}
