import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JunkGmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
