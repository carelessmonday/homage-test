exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.text('name').notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('users');
