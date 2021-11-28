const moment = require('moment');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const bookingsDates = [
  moment()
    .startOf('hour')
    .format('Y-MM-DD hh:mm:ss'),
];

for (let i = 1; i <= 18; i += 1) {
  bookingsDates.push(
    moment()
      .add(i, 'day')
      .add(getRandomInt(0, 23), 'hour')
      .startOf('hour')
      .format('Y-MM-DD hh:mm:ss'),
  );
}

exports.seed = (knex) => knex('bookings').del()
  .then(() => knex('bookings').insert([
    {
      id: 1,
      clinicsId: 2,
      usersId: 1,
      dose: 1,
      bookingDate: bookingsDates[getRandomInt(0, 17)],
      createdAt: moment().format('Y-MM-DD hh:mm:ss'),
    },
    {
      id: 2,
      clinicsId: 3,
      usersId: 4,
      dose: 1,
      bookingDate: bookingsDates[getRandomInt(0, 17)],
      createdAt: moment().format('Y-MM-DD hh:mm:ss'),
    },
    {
      id: 3,
      clinicsId: 6,
      usersId: 9,
      dose: 1,
      bookingDate: bookingsDates[getRandomInt(0, 17)],
      createdAt: moment().format('Y-MM-DD h:mm:ss'),
    },
  ]));
