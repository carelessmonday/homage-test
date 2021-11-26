exports.up = (knex) => knex.schema.createTable('bookings', (table) => {
  table.increments('id');
  table.integer('usersId').notNullable().index();
  table.integer('clinicsId').notNullable().index();
  table.integer('dose', 1).notNullable();
  table.dateTime('bookingDate').notNullable();
  table.dateTime('createdAt').notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('bookings');
