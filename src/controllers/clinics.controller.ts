import { Request, Response } from 'express';
import { createConnection, Connection } from 'typeorm';
import moment from 'moment';
import { groupBy, map } from 'lodash';
import dbOptions from '../db.options';
import Clinic from '../models/Clinic';
import Nurse from '../models/Nurse';
import Schedule from '../models/Schedule';
import Booking from '../models/Booking';
import User from '../models/User';
import { getBookingsForDate, getAvailableSlotCount } from '../services/bookings.service';

const dbConnection = async (): Promise<Connection> => createConnection({
  ...dbOptions,
  entities: [Clinic, Nurse, Schedule, Booking, User],
});

// TODO: Refactor to Transformer pattern
export const index = async (req: Request, res: Response) => {
  const db = await dbConnection();

  try {
    const dateQuery = req.query.date?.toString() ?? (new Date()).toDateString();
    const date = moment(dateQuery).format('Y-MM-DD');

    // Get availabe nurse schedule for date
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleRepo.find({
      where: { date },
      relations: ['clinics'],
    });

    // Get all bookings for date
    const bookingsRepo = db.getRepository(Booking);
    const bookings = await getBookingsForDate(bookingsRepo, dateQuery);

    const data = map(groupBy(schedule, 'clinicsId'), (sched) => ({
      clinic_id: sched[0].clinics.id,
      clinic_name: sched[0].clinics.name,
      slots: getAvailableSlotCount(sched.length, sched[0].clinics.id, bookings),
    }));

    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};

export const show = async (req: Request, res: Response) => {
  const db = await dbConnection();

  try {
    const id: number = parseInt(req.params.id, 10);
    const dateQuery = req.query.date?.toString() ?? (new Date()).toDateString();
    const date = moment(dateQuery).format('Y-MM-DD');
    const clinicRepo = db.getRepository(Clinic);
    const clinic = await clinicRepo.findOneOrFail(id);
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleRepo.find({
      where: { date, clinicsId: clinic.id },
    });

    // Get all bookings for date
    const bookingsRepo = db.getRepository(Booking);
    const bookings = await getBookingsForDate(bookingsRepo, dateQuery);

    res.status(200).json({
      clinic_id: clinic.id,
      clinic_name: clinic.name,
      slots: getAvailableSlotCount(schedule.length, clinic.id, bookings),
    });
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};
