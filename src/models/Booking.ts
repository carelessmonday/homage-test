import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import User from './User';

@Entity('bookings')
export default class Booking {
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

  @ManyToOne(() => User, (user) => user.bookings)
    users: User;
}
