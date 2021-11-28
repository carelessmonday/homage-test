import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import Booking from './Booking';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column('text')
    name: string;

  @OneToMany(() => Booking, (booking) => booking.users)
    bookings: Booking[];
}
