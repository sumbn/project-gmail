import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HotMail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'recovery_email' })
  recoveryEmail: string;

  @Column({ name: 'birth_day' })
  birthDay: Date;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'created_facebook', default: false })
  fb: boolean;
}
