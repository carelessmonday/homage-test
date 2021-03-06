import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,
} from 'typeorm';
import Nurse from './Nurse';

@Entity('clinics')
export default class Clinic {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    name: string;

  @ManyToMany(() => Nurse)
  @JoinTable({
    name: 'schedules',
  })
    nurses: Nurse[];
}
