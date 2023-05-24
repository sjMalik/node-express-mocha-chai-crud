/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sticker', table=> {
    table.increments();
    table.text('title').notNullable();
    table.text('desc');
    table.float('rating'),
    table.text('url')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sticker');
};
