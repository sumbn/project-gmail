import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountUserPlatform } from './accountUserPlatform.entity';

@Entity()
export class AccountUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AccountUserPlatform, (row) => row.user)
  userPlatform: AccountUserPlatform[];
}
