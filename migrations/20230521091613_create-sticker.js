/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('sticker', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('desc');
    table.float('rating');
    table.text('url');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('sticker');
