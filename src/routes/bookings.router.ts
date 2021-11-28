import express from 'express';

import {
  index, store, update, destroy,
} from '../controllers/bookings.controller';

const bookingsRouter = express.Router();

// TODO: Add Request, Auth Validation
bookingsRouter.get('/:userId', index);
bookingsRouter.post('/:userId', store);
bookingsRouter.post('/update/:userId/:bookingId', update);
bookingsRouter.delete('/update/:userId/:bookingId', destroy);

export default bookingsRouter;
