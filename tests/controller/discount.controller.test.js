const request = require('supertest');

const app = require('../../src/server.js');

describe('Discount API', () => {
    let id = '';

    it('should return error since theres no pagination params', async () => {
        const res = await request(app).get('/api/v1/discount/all');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    }),

    it('when creating discount and required parameters are not passed return 400', async () => {
        const res = await request(app)
            .post('/api/v1/discount/create')
            .send({
                name: 'BLACK FRIDAY',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors');
    }),

    it('should create a new discount', async () => {
        const res = await request(app)
            .post('/api/v1/discount/create')
            .send({
                name: 'BLACK FRIDAY',
                description: 'DIscounts for november',
                percentageOff: 20,
                active: true
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        console.log(res.body)
        id = res.body.id;
    }),

    it('incase discount does not exist return 404', async () => {
        const res = await request(app).get('/api/v1/discount/46');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    }),

    it('should show a discount with id', async () => {
        const res = await request(app).get('/api/v1/discount/'+id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    }),

    it('should show all discounts', async () => {
        const res = await request(app).get('/api/v1/discount/all?page=0&size=10');
        expect(res.statusCode).toEqual(200);
    }),

    it('should update a discount', async () => {
        const res = await request(app)
            .put('/api/v1/discount/'+id)
            .send({
                name: 'BLACK FRIDAY1',
                description: 'Discounts for november',
                percentageOff: 20,
                active: true
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    }),

    it('should delete a discount', async () => {
        const res = await request(app)
            .del('/api/v1/discount/'+id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})
