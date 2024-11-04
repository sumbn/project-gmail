import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AccountPlatform } from './accountPlatform.entity';

@Entity()
export class AccountStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => AccountPlatform, { nullable: true })
  platform: AccountPlatform;
}
