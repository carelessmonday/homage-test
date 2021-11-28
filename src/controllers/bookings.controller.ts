import { Request, Response } from 'express';
import { createConnection, Connection } from 'typeorm';
import moment from 'moment';
import dbOptions from '../db.options';
import User from '../models/User';
import Booking from '../models/Booking';
import Clinic from '../models/Clinic';
import Nurse from '../models/Nurse';
import {
  getAvailableSlotCount,
  getBookingsForDate,
  isSlotAvailable,
} from '../services/bookings.service';
import scheduleService from '../services/schedule.service';
import Schedule from '../models/Schedule';

const dbConnection = async (): Promise<Connection> => createConnection({
  ...dbOptions,
  entities: [Clinic, Booking, User, Nurse, Schedule],
});

export const index = async (req: Request, res: Response) => {
  const db = await dbConnection();

  const id: number = parseInt(req.params.userId, 10);
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOneOrFail(id, {
    relations: ['bookings'],
  });

  try {
    res.json(user);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};

// TODO: Add payload validation
export const store = async (req: Request, res: Response) => {
  const db = await dbConnection();

  try {
    const usersId: number = parseInt(req.params.userId, 10);
    const { clinicId, bookingDate, dose } = req.body;
    const userRepo = db.getRepository(User);
    await userRepo.findOneOrFail(usersId);
    const clinicRepo = db.getRepository(Clinic);
    const clinic = await clinicRepo.findOneOrFail(parseInt(clinicId, 10));
    const bookingRepo = db.getRepository(Booking);

    const booked = await bookingRepo.find({
      where: { dose, usersId },
    });

    if (booked.length) {
      res.status(400).send('Already booked.');
      return;
    }

    const slot = await isSlotAvailable(bookingRepo, clinic.id, dose, bookingDate);
    if (!slot) {
      res.status(400).send('Slot not available.');
      return;
    }

    // Get availabe nurse schedule for date
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleService(scheduleRepo, bookingDate);

    // Get all bookings for date
    const bookings = await getBookingsForDate(bookingRepo, bookingDate);
    const availableSlots = getAvailableSlotCount(schedule.length, clinic.id, bookings);

    if (availableSlots < 1) {
      res.status(400).send('No available slots for this date.');
      return;
    }

    const booking = bookingRepo.create({
      usersId,
      dose,
      clinicsId: clinicId,
      bookingDate: moment(bookingDate)
        .startOf('hour')
        .format('Y-MM-DD HH:mm:ss'),
      createdAt: moment().format('Y-MM-DD hh:mm:ss'),
    });
    await bookingRepo.insert(booking);
    res.status(200).json(booking);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};

// TODO: Add payload validation
export const update = async (req: Request, res: Response) => {
  const db = await dbConnection();

  try {
    const usersId: number = parseInt(req.params.userId, 10);
    const bookingId: number = parseInt(req.params.bookingId, 10);
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOneOrFail(usersId);
    const bookingRepo = db.getRepository(Booking);
    const booking = await bookingRepo.findOneOrFail({
      where: { usersId: user.id, id: bookingId },
    });

    const { clinicId, bookingDate, dose } = req.body;

    const clinicRepo = db.getRepository(Clinic);
    const clinic = await clinicRepo.findOneOrFail(parseInt(clinicId, 10));
    const slot = await isSlotAvailable(bookingRepo, clinic.id, dose, bookingDate);
    if (!slot) {
      res.status(400).send('Slot not available.');
      return;
    }

    // Get availabe nurse schedule for date
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleService(scheduleRepo, bookingDate);

    // Get all bookings for date
    const bookings = await getBookingsForDate(bookingRepo, bookingDate);
    const availableSlots = getAvailableSlotCount(schedule.length, clinic.id, bookings);

    if (availableSlots < 1) {
      res.status(400).send('No available slots for this date.');
      return;
    }

    booking.clinicsId = clinic.id;
    booking.bookingDate = bookingDate;
    await bookingRepo.save(booking);

    res.status(200).json(booking);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};

export const destroy = async (req: Request, res: Response) => {
  const db = await dbConnection();
  const usersId: number = parseInt(req.params.userId, 10);
  const bookingId: number = parseInt(req.params.bookingId, 10);

  try {
    const bookingRepo = db.getRepository(Booking);
    const booking = await bookingRepo.findOneOrFail({
      where: {
        usersId,
        id: bookingId,
      },
    });
    await bookingRepo.delete(booking);
    res.status(200).send('success');
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};
