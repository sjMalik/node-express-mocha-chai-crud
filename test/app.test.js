const { expect } = require('chai');
const request = require('supertest');

const knex = require('../db/knex');
const app = require('../app');

const { stickers, sticker } = require('./fixtures');

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
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(stickers);
    });

    it('Get one sticker with status 200 - GET /api/v1/stickers/:id', async () => {
        const response = await request(app)
            .get('/api/v1/stickers/1')
            .set(commonHeaders);
        expect(response.status).equal(200);
        expect(response.body).to.be.a('object');
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
    });

    let newStickerId;
    it('Create a sticker POST /api/v1/stickers', async () => {
        await request(app)
            .post('/api/v1/stickers')
            .send(sticker)
            .set(commonHeaders)
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('object');
                sticker.id = response.body.id;
                newStickerId = sticker.id;
                expect(response.body).to.deep.equal(sticker);
            });
    });

    it('Create a invalid sticker', async () => {
        await request(app)
            .post('/api/v1/stickers')
            .send({
                title: 1,
                desc: '',
            }).set(commonHeaders)
            .expect(500);
    });

    it('Update the sticker /api/v1/stickers/:id', async () => {
        const sticker = {
            title: 'HTML5',
            desc: 'html logo',
            rating: 1,
            url: 'https://devstickers.com/assets/img/pro/ny2e.png',
        };
        await request(app)
            .put(`/api/v1/stickers/${newStickerId}`)
            .set(commonHeaders)
            .send(sticker)
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                sticker.id = response.body.id;
                expect(response.body).to.be.a('object');
                expect(response.body).to.deep.equal(sticker);
            });
    });

    it('Delete the sticker /api/v1', async () => {
        await request(app)
            .delete(`/api/v1/stickers/${newStickerId}`)
            .set(commonHeaders)
            .expect(200);
    });
});
