import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountPlatform } from './accountPlatform.entity';
import { AccountStatus } from './accountStatus.entity';
import { AccountUser } from './accountUser.entity';

@Entity()
export class AccountUserPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountUser)
  user: AccountUser;

  @ManyToOne(() => AccountPlatform)
  platform: AccountPlatform;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => AccountStatus)
  status: AccountStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
