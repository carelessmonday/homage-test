exports.up = (knex) => knex.schema.createTable('clinics', (table) => {
  table.increments('id');
  table.text('name').nullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('clinics');
