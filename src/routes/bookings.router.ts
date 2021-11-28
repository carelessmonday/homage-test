import express from 'express';

import { index } from '../controllers/bookings.controller';

const bookingsRouter = express.Router();

// TODO: Add Request, Auth Validation
bookingsRouter.get('/:userId', index);

export default bookingsRouter;
