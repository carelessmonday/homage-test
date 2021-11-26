import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import moment from 'moment';
import { groupBy, map } from 'lodash';
import Clinic from '../models/Clinic';
import Nurse from '../models/Nurse';
import Schedule from '../models/Schedule';
import dbOptions from '../db.options';

const clinicsRouter = express.Router();
const patientsPerNurse = 10;

// TODO: Add Request Validation
clinicsRouter.get('/', async (req: Request, res: Response) => {
  const db = await createConnection({
    ...dbOptions,
    entities: [Clinic, Nurse, Schedule],
  });

  try {
    const dateQuery = req.query.date?.toString() ?? (new Date()).toDateString();
    const date = moment(dateQuery).format('Y-M-D');
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleRepo.find({
      where: { date },
      relations: ['clinics'],
    });
    const data = map(groupBy(schedule, 'clinicsId'), (items) => ({
      clinic_id: items[0].clinics.id,
      clinic_name: items[0].clinics.name,
      slots: items.length * patientsPerNurse,
    }));

    res.status(200).json(data);
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
});

// TODO: Add Request Validation
clinicsRouter.get('/:id', async (req: Request, res: Response) => {
  const db = await createConnection({
    ...dbOptions,
    entities: [Clinic, Nurse, Schedule],
  });

  try {
    const id: number = parseInt(req.params.id, 10);
    const dateQuery = req.query.date?.toString() ?? (new Date()).toDateString();
    const date = moment(dateQuery).format('Y-M-D');
    const clinicRepo = db.getRepository(Clinic);
    const clinic = await clinicRepo.findOneOrFail(id);
    const scheduleRepo = db.getRepository(Schedule);
    const schedule = await scheduleRepo.find({
      where: {
        date,
        clinicsId: clinic.id,
      },
    });

    res.status(200).json({
      clinic_id: clinic.id,
      clinic_name: clinic.name,
      slots: schedule.length * patientsPerNurse,
    });
  } catch (e) {
    res.status(500).send(e.message);
  } finally {
    await db.close();
  }
});

export default clinicsRouter;
