# Node.js Express JSON API - CRUD Stickers
https://github.com/w3cj/CRUD-stickers-server
https://www.youtube.com/watch?v=xFsaRVNLtxI&list=PLM_i0obccy3uwR6ZYa7QE03xDRAqs4Aso&index=1&ab_channel=CodingGarden


We'll be using:
* Postgres for our database
* knex.js for our database migrations, seeds and queries.
* express.js for our JSON routes
* Mocha, Chai and SuperTest to test our routes

* Prerequisites (Mac OS Commands)
  * Latest version of Node.js
    * brew install node
  * Postgres
    * brew install postgres
    * brew services start postgres
    * createdb
  * Express Generator
    * npm install -g express-generator
  * Knex installed globaly
    * npm install -g knex

## Server Check List
* Create a server folder
    - mkdir server
  * Generate Express App
    - cd server
    - express
  * initialize git repo
    - git init
    - npm i gitignore -g    // Installl if not present
    - gitignore node        // Creates a gitignore file for node application
* Create database
* Initialize knex project
  * Install knex and pg
    - npm i knex pg
  * Create knexfile.js
    - knex init
* Create sticker table migration
  - Table: Sticker
  ==================================
  id          | serial(PK)
  title       | text
  description | text
  rating      | float
  url         | text
  - knex migrate:latest
* Seed sticker table with sample data
  - knex seed:run
* Convert Express App to JSON API
  * Remove view rendering
  * Remove routes folder
  * Remove static serve and public folder
  * Update error handler
* Add api folder and create/mount router
* Connect to the database'
  * Create database connection file
  * Create a queries file
* List all records with GET /api/v1/stickers
  * Create query
  * Create route
* Setup tests
  * Install mocha, chai and supertest
    - npm i -D mocha chai supertest
  * Add a test database connection
  * Add npm test script
    * Drop/Create database
  * Create before
    * Run migrations/seeds on test db
      ```
      before((done)=> {
        knex.migrate.latest().then(()=> {
            return knex.seed.run()
        }).then(()=> done())
    });
    ```
* Make sure the tests are working!
* List all records with GET /api/v1/stickers
    * Add test using supertest
      ```
      const request = require('supertest');
      const expect = require('chai').expect;
      const app = require('../app.js');

      const commonHeaders = {
        // Authorization: 'Bearer '+ reply.body.token,
        'Content-Type': 'application/json'
      };
      describe('GET /api/v1/stickers', function() {
        it('responds with status 200', function(done) {
          const response = await request(app)
            .get('/api/v1/stickers')
            .set(commonHeaders);
          expect(response.status).toBe(200);
        });
      });
      ```
      Reference: https://www.npmjs.com/package/supertest
* Show one record with GET /api/v1/stickers/:id
  * Validate id
  * Create query
  * Create route
  * Add test
* Create a record with POST /api/v1/stickers
  * Create route
  * Validate sticker!
  * Create query
  * Add test
* Update a record with PUT /api/v1/stickers/:id
  * Create route
  * Validate id
  * Validate updates
  * Create query
  * Add test
* Delete a record with DELETE /api/v1/stickers/:id
  * Create route
  * Validate id
  * Create query
  * Add test