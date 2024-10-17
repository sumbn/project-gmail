import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
// @Index(['isLive', 'isVerify', 'createdBy'])
// @Index(['isLive', 'createdBy'])
// @Index(['isVerify', 'createdBy'])
@Index('idx_email', ['email'])
@Index('idx_created_at', ['createdAt'])
@Index('idx_updated_at', ['updatedAt'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'phone_model', nullable: true })
  phoneModel: string;

  // @Index()
  @Column({ name: 'is_Live', default: false })
  isLive: boolean;

  // @Index()
  @Column({ name: 'is_verify', default: false })
  isVerify: boolean;

  @Column({ name: 'recovery_mail', nullable: true })
  recoveryMail: string;

  // @Index()
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_locked', default: false })
  isLocked: boolean;

  @Column({ name: 'locked_at', nullable: true })
  lockAt: Date;
}
