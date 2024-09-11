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

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'is_fb_checked', default: false })
  isFbChecked: boolean;

  @Column({ name: 'is_verify', default: false })
  isVerify: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
