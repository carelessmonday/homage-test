import { Between, Repository } from 'typeorm';
import moment from 'moment';
import Booking from '../models/Booking';

const patientsPerNurse = 10;

export const getBookingsForDate = async (
  repo: Repository<Booking>,
  date: string,
): Promise<Booking[]> => repo.find({
  where: {
    bookingDate: Between(
      moment(date).startOf('day').format('Y-MM-DD HH:mm:ss'),
      moment(date).endOf('day').format('Y-MM-DD HH:mm:ss'),
    ),
  },
});

export const isSlotAvailable = async (
  repo: Repository<Booking>,
  clinicsId: number,
  dose: number,
  date: string,
): Promise<boolean> => {
  const slot = await repo.find({
    where: {
      dose,
      clinicsId,
      bookingDate: moment(date)
        .startOf('hour')
        .format('Y-MM-DD HH:mm:ss'),
    },
  });

  return slot.length < 1;
};

export const getAvailableSlotCount = (
  nurseCount: number,
  clinicId: number,
  bookings: Booking[],
): number => nurseCount * patientsPerNurse - bookings
  .filter((booking) => booking.clinicsId === clinicId).length;
