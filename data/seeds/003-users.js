exports.seed = (knex) => knex('users').del()
  .then(() => knex('users').insert([
    { id: 1, name: 'Zavala' },
    { id: 2, name: 'Cayde' },
    { id: 3, name: 'Ikora' },
    { id: 4, name: 'Mara Sov' },
    { id: 5, name: 'Uldren' },
    { id: 6, name: 'Anastasia' },
    { id: 7, name: 'Xur' },
    { id: 8, name: 'Shin Malphur' },
    { id: 9, name: 'Rahool' },
  ]));
