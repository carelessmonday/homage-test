import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';
import Clinic from './Clinic';
import Nurse from './Nurse';

@Entity('schedules')
export default class Schedule {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('integer')
    clinicsId: number;

  @Column('integer')
    nursesId: number;

  @Column('date')
    date: string;

  @OneToOne(() => Nurse)
  @JoinColumn()
    nurses: Nurse;

  @OneToOne(() => Clinic)
  @JoinColumn()
    clinics: Clinic;
}
