exports.up = (knex) => knex.schema.createTable('nurses', (table) => {
  table.increments('id');
  table.text('name').notNullable();
});

exports.down = (knex) => knex.schema.dropTableIfExists('nurses');
