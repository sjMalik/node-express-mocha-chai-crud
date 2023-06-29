/* eslint-disable */
const { expect } = require('chai');
const request = require('supertest');

const knex = require('../db/knex');
const app = require('../app');

const { stickers } = require('./fixtures');

describe('CRUD Sticker test', () => {
    before((done) => {
        knex.migrate.latest().then(() => knex.seed.run()).then(() => done());
    });

    const commonHeaders = {
        // Authorization: 'Bearer '+ reply.body.token,
        'Content-Type': 'application/json',
    };

    it('List all stickers - GET /api/v1/stickers', async () => {
        const response = await request(app)
            .get('/api/v1/stickers')
            .set(commonHeaders);
        expect(response.status).equal(200);
        expect(response.body).to.deep.equal(stickers);
    });

    it('Get one sticker with status 200 - GET /api/v1/stickers/:id', async () => {
        const response = await request(app)
            .get('/api/v1/stickers/1')
            .set(commonHeaders);
        expect(response.status).equal(200);
        expect(response.body).to.deep.equal(stickers[0]);
    });

    it('Get one sticker with status 404', async () => {
        const response = await request(app)
            .get('/api/v1/stickers/100')
            .set(commonHeaders);
        expect(response.status).equal(404);
    });

    it('Get one sticker with status 500', async () => {
        const response = await request(app)
            .get('/api/v1/stickers/abcd')
            .set(commonHeaders);
        expect(response.status).equal(500);
    })
});
