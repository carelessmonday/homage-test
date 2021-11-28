import { Request, Response } from 'express';
import { createConnection, Between } from 'typeorm';
import moment from 'moment';
import { groupBy, map } from 'lodash';
import dbOptions from '../db.options';
import Clinic from '../models/Clinic';
import Nurse from '../models/Nurse';
import Schedule from '../models/Schedule';
import Booking from '../models/Booking';

const patientsPerNurse = 10;

// TODO: Refactor to Transformer pattern
export const index = async (req: Request, res: Response) => {
  const db = await createConnection({
    ...dbOptions,
    entities: [Clinic, Nurse, Schedule, Booking],
  });

  try {
    const dateQuery = req.query.date?.toString() ?? (new Date()).toDateString();
    const date = moment(dateQuery).format('Y-MM-DD');
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleRepo.find({
      where: { date },
      relations: ['clinics'],
    });
    const bookingsRepo = db.getRepository(Booking);
    const bookings = await bookingsRepo.find({
      where: {
        bookingDate: Between(
          moment(dateQuery).startOf('day').format('Y-MM-DD HH:mm:ss'),
          moment(dateQuery).endOf('day').format('Y-MM-DD HH:mm:ss'),
        ),
      },
    });

    const data = map(groupBy(schedule, 'clinicsId'), (sched) => ({
      clinic_id: sched[0].clinics.id,
      clinic_name: sched[0].clinics.name,
      slots: sched.length * patientsPerNurse - bookings
        .filter((booking) => booking.clinicsId === sched[0].clinics.id).length,
    }));

    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};

export const show = async (req: Request, res: Response) => {
  const db = await createConnection({
    ...dbOptions,
    entities: [Clinic, Nurse, Schedule, Booking],
  });

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
    const bookingsRepo = db.getRepository(Booking);
    const bookings = await bookingsRepo.find({
      where: {
        clinicsId: clinic.id,
        bookingDate: Between(
          moment(dateQuery).startOf('day').format('Y-MM-DD HH:mm:ss'),
          moment(dateQuery).endOf('day').format('Y-MM-DD HH:mm:ss'),
        ),
      },
    });

    res.status(200).json({
      clinic_id: clinic.id,
      clinic_name: clinic.name,
      slots: schedule.length * patientsPerNurse - bookings
        .filter((booking) => booking.clinicsId === clinic.id).length,
    });
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
};
