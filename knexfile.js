// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:mysecretpassword@localhost/express_crud',
  },
  test: {
    client: 'pg',
    connection: 'postgres://postgres:mysecretpassword@localhost/test_express_crud',
  },
};
