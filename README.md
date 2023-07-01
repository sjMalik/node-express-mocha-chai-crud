# Node.js Express JSON API - CRUD Stickers
1. https://github.com/w3cj/CRUD-stickers-server
2. https://www.youtube.com/watch?v=xFsaRVNLtxI&list=PLM_i0obccy3uwR6ZYa7QE03xDRAqs4Aso&index=1&ab_channel=CodingGarden


We'll be using
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
    - $ cd server
    - $ express
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
  ```
  ==================================
  id          | serial(PK)
  title       | text
  description | text
  rating      | float
  url         | text
  ```
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

## [Eslint Documentation](https://eslint.org/docs/latest/)

## [Set eslinter in your node project](https://mojitocoder.medium.com/how-to-add-code-linting-for-a-node-js-project-b210d8759cd5)
  lint, or a linter, is a static code analysis tool used to flag programming errors, bugs, stylistic errors, and suspicious constructs.
1. Step 1. Add eslint npm package as a development dependency.
    ```
    npm install eslint --save-dev
    ```
2. Step 2. Run eslint init and follow the wizard
    ```
    ./node_modules/.bin/eslint --init
    ```
3. Step 3. Add npm scripts
    ```
    "lint": "eslint .  --ext .js",
    "lint-fix": "eslint --fix .  --ext .js"
    ```
4. Run
    ```
    npm run lint
    ```

## [Turning off eslint rule for a specific file](https://stackoverflow.com/questions/34764287/turning-off-eslint-rule-for-a-specific-file)
Let's have a breakdown of the scenarios, like you always do, dear awesome developer!

Here are two questions to ask yourself, first.

Question One: How many "rules" do you want to ignore?
All Rules
One or more Specific Rules (e.g. quotes or semi)
Question Two: How many "lines/files" do you want to ignore?
One or more Lines
All lines in one or more Files
Everywhere
Now, based on the your answers, there are 2 × 3 = 6 cases.

1) Disabling "All rules"
Case 1.1: You want to disable "All Rules" for "One or more Lines"

Two ways you can do this:

Put /* eslint-disable-line */ at the end of the line(s),
or /* eslint-disable-next-line */ right before the line.
Case 1.2: You want to disable "All Rules" for "One File"

Put the comment of /* eslint-disable */ at the top of the file.
Case 1.3: You want to disable "All rules" for "Some Files"

There are 3 ways you can do this:

You can go with 1.2 and add /* eslint-disable */ on top of the files, one by one.
You can put the file name(s) in .eslintignore. This works well, especially if you have a path that you want to be ignored. (e.g. apidoc/**)
Alternatively, if you don't want to have a separate .eslintignore file, you can add "eslintIgnore": ["file1.js", "file2.js"] in package.json as instructed here.
2) Disabling "Some Rules"
Case 2.1: You want to disable "Some Rules" for "One or more Lines"

Two ways you can do this:

You can put /* eslint-disable-line quotes */ (replace quotes with your rules) at the end of the line(s),

or /* eslint-disable-next-line no-alert, quotes, semi */ before the line.

## [Add Swagger](https://github.com/syed-ashraf123/swagger-express/tree/master)
1. Install dependency
```
npm install swagger-ui-express and yamljs
```
2. Add the below in `app.js`
```
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');

app.use('/api-dcos', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
```
3. Create `nodemon.json` file root directory of project and add below
```
{
    "ext": ".ts, .js, .mjs, .json, .yaml"
}
```
