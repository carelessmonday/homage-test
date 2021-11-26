import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import Clinic from '../models/Clinic';
import dbOptions from '../db.options';

const clinicsRouter = express.Router();

clinicsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const db = await createConnection({
      ...dbOptions,
      entities: [Clinic],
    });

    const clinics = db.getRepository(Clinic);
    const allClinics = await clinics.find();
    await db.close();
    res.status(200).json(allClinics);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

export default clinicsRouter;
