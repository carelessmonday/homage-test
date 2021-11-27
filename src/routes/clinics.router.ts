import express from 'express';

import { index, show } from '../controllers/clinics.controller';

const clinicsRouter = express.Router();

// TODO: Add Request Validation
clinicsRouter.get('/', index);
clinicsRouter.get('/:id', show);

export default clinicsRouter;
