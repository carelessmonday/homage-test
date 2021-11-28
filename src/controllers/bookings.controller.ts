import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
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

export default index;
