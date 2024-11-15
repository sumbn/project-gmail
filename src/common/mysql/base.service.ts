import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';

import { BaseDto } from '../base.dto';
import { MyBaseEntity } from './base.entity';
import { mapDtoToEntity } from '../utils/mapDtoToEntity';
import { plainEntityToDto } from '../utils/plainEntityToDto';

@Injectable()
export class GenericService<Entity extends MyBaseEntity> {
  constructor(
    protected readonly repo: Repository<Entity>,
    private readonly entityClass: new () => Entity,
  ) {}

  async save<Dto extends BaseDto>(
    dto: Dto,
    dtoClass: new () => Dto,
  ): Promise<Dto> {
    try {
      const entity = mapDtoToEntity(dto, this.entityClass);
      const savedEntity = await this.repo.save(entity);
      return plainEntityToDto(savedEntity, dtoClass);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw new BadRequestException(`Save failed: ${error.message}`);
    }
  }

  async update<Dto extends BaseDto>(
    id: string,
    dto: Dto,
  ): Promise<{ result: string }> {
    try {
      const entity = mapDtoToEntity(dto, this.entityClass);
      await this.repo.update(id, entity as any);
      return { result: 'Update success' };
    } catch (e) {
      throw new Error(`Update failed: ${e.message}`);
    }
  }

  async findOne<Dto extends BaseDto>(
    id: Entity['id'],
    dtoClass: new () => Dto,
  ): Promise<Dto> {
    try {
      const foundUser = await this.repo.findOne({
        where: { id } as FindOptionsWhere<Entity>,
      });

      if (!foundUser) {
        throw new Error(`Record with id ${id} not found`);
      }

      return plainEntityToDto(foundUser, dtoClass);
    } catch (e) {
      throw new Error(`Failed to find record with id ${id}: ${e.message}`);
    }
  }

  async deleteById(id: string): Promise<{ result: string }> {
    try {
      await this.repo.softDelete(id);
      return {
        result: 'delete success',
      };
    } catch (error) {
      throw new Error(
        `Failed to delete record with id ${id}: ${error.message}`,
      );
    }
  }
}
