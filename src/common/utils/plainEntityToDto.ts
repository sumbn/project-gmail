import { plainToInstance } from 'class-transformer';

export function plainEntityToDto<Entity, Dto>(
  entity: Entity,
  dtoClass: new () => Dto,
): Dto {
  return plainToInstance(dtoClass, entity, { excludeExtraneousValues: true });
}
