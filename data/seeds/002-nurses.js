exports.seed = (knex) => knex('nurses').del()
  .then(() => knex('nurses').insert([
    { id: 1, name: 'Chase' },
    { id: 2, name: 'River' },
    { id: 3, name: 'Sky' },
    { id: 4, name: 'Jodi' },
    { id: 5, name: 'Alex' },
    { id: 6, name: 'Sydney' },
    { id: 7, name: 'Niki' },
    { id: 8, name: 'Alaska' },
    { id: 9, name: 'Margaux' },
  ]));
