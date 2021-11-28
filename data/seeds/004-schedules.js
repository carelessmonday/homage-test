const moment = require('moment');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const scheduleDates = [moment().format('Y-MM-DD')];

for (let i = 1; i <= 18; i += 1) {
  scheduleDates.push(moment().add(i, 'day').format('Y-MM-DD'));
}

const schedules = [];

for (let i = 1; i <= 18; i += 1) {
  schedules.push({
    id: i,
    clinicsId: getRandomInt(1, 9),
    nursesId: getRandomInt(1, 9),
    date: scheduleDates[getRandomInt(0, 17)],
  });
}

exports.seed = (knex) => knex('schedules').del()
  .then(() => knex('schedules').insert(schedules));
