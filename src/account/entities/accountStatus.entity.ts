import { Column, Entity, ManyToOne } from 'typeorm';
import { MyBaseEntity } from '../../common/mysql/base.entity';
import { AccountPlatform } from './accountPlatform.entity';

@Entity()
export class AccountStatus extends MyBaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => AccountPlatform, { nullable: true })
  platform: AccountPlatform;
}
