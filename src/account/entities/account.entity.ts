import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'phone_model', nullable: true })
  phoneModel: string;

  @Column({ name: 'is_Live', default: false })
  isLive: boolean;

  @Column({ name: 'is_verify', default: false })
  isVerify: boolean;

  @Column({ name: 'recovery_mail', nullable: true })
  recoveryMail: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_locked', default: false })
  isLocked: boolean;

  @Column({ name: 'locked_at', nullable: true })
  lockAt: Date;
}
