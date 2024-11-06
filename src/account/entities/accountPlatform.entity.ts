import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccountUserPlatform } from './accountUserPlatform.entity';
import { AccountStatus } from './accountStatus.entity';

@Entity()
export class AccountPlatform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => AccountUserPlatform, (row) => row.platform)
  accounts: AccountUserPlatform[];

  @OneToMany(() => AccountStatus, (status) => status.platform)
  statuses: AccountStatus[];
}
