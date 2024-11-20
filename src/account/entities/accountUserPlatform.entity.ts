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

  @Column({ name: 'phone_model', length: 20 })
  phoneModel: string;

  @Column({ name: 'phone_id', length: 20 })
  phoneId: string;

  @Column({ name: 'created_by', length: 30 })
  createdBy: string;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ nullable: true })
  lockedAt?: Date;

  @Column({ default: true })
  isOwn: boolean;
}
