import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RandomValueType {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}

@Entity()
export class UserInfoGen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RandomValueType,
  })
  type: RandomValueType;

  @Column()
  value: string;
}

export enum ThemeType {
  ANIMAL = 'animal',
  PLANET = 'planet',
  EARTH = 'earth',
  TREE = 'tree',
  NATURE = 'nature',
  SPORT = 'sport',
  CITY = 'city',
  TRAVEL = 'travel',
  HOBBY = 'hobby',
  JOB = 'job',
}

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ThemeType,
  })
  theme: ThemeType;

  @Column()
  value: string;
}

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;
}
