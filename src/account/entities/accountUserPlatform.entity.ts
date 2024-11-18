import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { MyBaseEntity } from '../../common/mysql/base.entity';
import { AccountPlatform } from './accountPlatform.entity';
import { AccountStatus } from './accountStatus.entity';
import { AccountUser } from './accountUser.entity';

@Entity()
@Index(['username', 'platform'], { unique: true })
@Index(['platform'])
export class AccountUserPlatform extends MyBaseEntity {
  @ManyToOne(() => AccountUser)
  user: AccountUser;

  @ManyToOne(() => AccountPlatform)
  platform: AccountPlatform;

  @Column()
  username: string;

  @Column({ nullable: true })
  password: string;

  @ManyToOne(() => AccountStatus)
  status: AccountStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ nullable: true })
  lockedAt?: Date;

  @Column({ default: true })
  isOwn: boolean;
}
