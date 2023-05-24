const expect = require('chai').expect;
const request = require('supertest');

const knex = require('../db/knex');
const app = require('../app');

const {stickers} = require('./fixtures');

describe('CRUD Sticker test', ()=> {
    before((done)=> {
        knex.migrate.latest().then(()=> {
            return knex.seed.run()
        }).then(()=> done())
    });

    const commonHeaders = {
        // Authorization: 'Bearer '+ reply.body.token,
        'Content-Type': 'application/json'
    };

    it('List all stickers - GET /api/v1/stickers', async ()=> {
        const response = await request(app)
            .get('/api/v1/stickers')
            .set(commonHeaders);
        expect(response.status).equal(200);
        expect(response.body).to.deep.equal(stickers)
    });
})