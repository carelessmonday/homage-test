import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('schedules')
export default class Schedule {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('integer')
    usersId: number;

  @Column('integer')
    clinicsId: number;

  @Column('integer')
    dose: number;

  @Column('date')
    bookingDate: string;

  @Column('date')
    createdAt: string;
}
