import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AccountPlatform } from './accountPlatform.entity';

@Entity()
export class AccountStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => AccountPlatform, { nullable: true })
  platform: AccountPlatform;
}
