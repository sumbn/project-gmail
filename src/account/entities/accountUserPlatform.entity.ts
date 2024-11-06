import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountPlatform } from './accountPlatform.entity';
import { AccountStatus } from './accountStatus.entity';
import { AccountUser } from './accountUser.entity';

@Entity()
@Index(['username', 'platform'], { unique: true })
export class AccountUserPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountUser)
  user: AccountUser;

  @ManyToOne(() => AccountPlatform)
  platform: AccountPlatform;

  @Column()
  username: string;

  @Column()
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
}
