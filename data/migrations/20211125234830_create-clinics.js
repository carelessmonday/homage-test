exports.up = (knex) => knex.schema.createTable('clinics', (table) => {
  table.increments('id');
  table.text('name').notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('clinics');
