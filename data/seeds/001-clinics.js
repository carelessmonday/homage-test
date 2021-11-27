exports.seed = (knex) => knex('clinics').del()
  .then(() => knex('clinics').insert([
    { id: 1, name: 'Tampines' },
    { id: 2, name: 'Yishun' },
    { id: 3, name: 'Pasir Ris' },
    { id: 4, name: 'Bedok' },
    { id: 5, name: 'Clemente' },
    { id: 6, name: 'Bouna Vista' },
    { id: 7, name: 'Serangoon' },
    { id: 8, name: 'Bishan' },
    { id: 9, name: 'Tanjon Pagar' },
  ]));
