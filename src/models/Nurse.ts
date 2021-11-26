import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable,
} from 'typeorm';
import Clinic from './Clinic';

@Entity('nurses')
export default class Nurse {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    name: string;

  @ManyToMany(() => Clinic)
  @JoinTable({
    name: 'schedules',
  })
    clinics: Clinic[];
}
