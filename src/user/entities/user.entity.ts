import { Column, Entity } from 'typeorm';
import { MyBaseEntity } from '../../common/mysql/base.entity';

@Entity()
export class User extends MyBaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column()
  password: string;
}
