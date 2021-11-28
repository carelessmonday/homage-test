import { Repository } from 'typeorm';
import moment from 'moment';
import Schedule from '../models/Schedule';

const getScheduleForDate = async (
  repo: Repository<Schedule>,
  date: string,
): Promise<Schedule[]> => repo.find({
  where: {
    date: moment(date)
      .format('Y-MM-DD'),
  },
  relations: ['clinics'],
});

export default getScheduleForDate;
