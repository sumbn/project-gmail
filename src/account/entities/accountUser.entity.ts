import { Entity, OneToMany } from 'typeorm';
import { MyBaseEntity } from '../../common/mysql/base.entity';
import { AccountUserPlatform } from './accountUserPlatform.entity';

@Entity()
export class AccountUser extends MyBaseEntity {
  @OneToMany(() => AccountUserPlatform, (row) => row.user)
  userPlatform: AccountUserPlatform[];
}
