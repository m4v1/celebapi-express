/* eslint-disable func-names */

exports.up = function(knex) {
  return knex.schema.createTable('profiles', function(table) {
    table.increments('id');
    table.string('name', 150).notNullable();
    table.unique('name');
    table.date('bday').notNullable();
    table.string('bplace', 150).notNullable();
    table.text('bio');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles');
};
