import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import moment from 'moment';
import dbOptions from '../db.options';
import User from '../models/User';
import Booking from '../models/Booking';
import Clinic from '../models/Clinic';
import Nurse from '../models/Nurse';

export const index = async (req: Request, res: Response) => {
  const db = await createConnection({
    ...dbOptions,
    entities: [Clinic, Booking, User, Nurse],
  });

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
  const db = await createConnection({
    ...dbOptions,
    entities: [Clinic, Booking, User, Nurse],
  });

  try {
    const usersId: number = parseInt(req.params.userId, 10);
    const { clinicId, bookingDate, dose } = req.body;
    const userRepo = db.getRepository(User);
    await userRepo.findOneOrFail(usersId);
    const clinicRepo = db.getRepository(Clinic);
    await clinicRepo.findOneOrFail(clinicId);
    const bookingRepo = db.getRepository(Booking);
    const booked = await bookingRepo.find({
      where: { dose, usersId },
    });

    if (booked.length) {
      res.status(400).send('Already booked.');
      return;
    }

    const slotUnavailable = await bookingRepo.find({
      where: {
        dose,
        bookingDate: moment(bookingDate)
          .startOf('hour')
          .format('Y-MM-DD HH:mm:ss'),
      },
    });

    if (slotUnavailable.length) {
      res.status(400).send('Slot not available.');
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

export const update = async (req: Request, res: Response) => {
  res.json('yo update this');
};

export const destroy = async (req: Request, res: Response) => {
  res.json('yo delete this');
};
