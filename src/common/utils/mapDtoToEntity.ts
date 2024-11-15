import { DeepPartial } from 'typeorm';

export function mapDtoToEntity<Dto, Entity>(
  dto: Dto,
  entityClass: new () => Entity,
): DeepPartial<Entity> {
  const entity: Entity = new entityClass();

  Object.assign(entity, dto);

  // if (dto.createdAt) {
  //   (entity as any).createdAt = new Date(dto.createdAt);
  // }
  // if (dto.updatedAt) {
  //   (entity as any).updatedAt = new Date(dto.updatedAt);
  // }

  return entity as DeepPartial<Entity>;
}
