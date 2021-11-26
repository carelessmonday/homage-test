exports.up = (knex) => knex.schema.createTable('schedules', (table) => {
  table.increments('id');
  table.integer('clinicsId').notNullable().index();
  table.integer('nursesId').notNullable().index();
  table.date('date').notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('schedules');
