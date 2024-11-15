import { Repository } from 'typeorm';
import { GenericService } from '../mysql/base.service';
import { MyBaseEntity } from '../mysql/base.entity';

export class GenericServiceFactory {
  static createService<Entity extends MyBaseEntity>(
    repo: Repository<Entity>,
    entityClass: new () => Entity,
  ): GenericService<Entity> {
    return new GenericService(repo, entityClass);
  }
}
