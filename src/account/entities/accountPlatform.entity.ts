import { Column, Entity, OneToMany } from 'typeorm';
import { MyBaseEntity } from '../../common/mysql/base.entity';
import { AccountStatus } from './accountStatus.entity';
import { AccountUserPlatform } from './accountUserPlatform.entity';

@Entity()
export class AccountPlatform extends MyBaseEntity {
  @Column({ unique: true, length: 30 })
  name: string;

  @OneToMany(() => AccountUserPlatform, (row) => row.platform)
  accounts: AccountUserPlatform[];

  @OneToMany(() => AccountStatus, (status) => status.platform)
  statuses: AccountStatus[];
}
