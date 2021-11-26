import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class Nurse {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    name: string;
}
