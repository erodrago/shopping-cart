const request = require('supertest');

const app = require('../../src/server.js');

describe('Category API', () => {
    let id = '';

    it('should return error since theres no pagination params', async () => {
        const res = await request(app).get('/api/v1/category/all');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    }),

    it('when creating category and required parameters are not passed return 400', async () => {
        const res = await request(app)
            .post('/api/v1/category/create')
            .send({
                name: 'CLOTHING',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors');
    }),

    it('should create a new category', async () => {
        const res = await request(app)
            .post('/api/v1/category/create')
            .send({
                name: 'CLOTHING',
                description: 'Category for clothes'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        id = res.body.id;
        console.log('id'+id);
    }),

    it('incase category does not exist return 404', async () => {
        const res = await request(app).get('/api/v1/category/46');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    }),

    it('should show a category with id', async () => {
        const res = await request(app).get('/api/v1/category/'+id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    }),

    it('should show all categorys', async () => {
        const res = await request(app).get('/api/v1/category/all?page=0&size=10');
        expect(res.statusCode).toEqual(200);
    }),

    it('should update a category', async () => {
        const res = await request(app)
            .put('/api/v1/category/'+id)
            .send({
                name: 'CLOTHINGS',
                description: 'Category for clothes',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    }),

    it('should delete a category', async () => {
        const res = await request(app)
            .del('/api/v1/category/'+id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})
