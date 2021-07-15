const request = require('supertest');

const app = require('../../src/server.js');

describe('Product API', () => {
    let id = 0;

    it('when creating product and required parameters are not passed return 400', async () => {
        const res = await request(app)
            .post('/api/v1/product/create')
            .send({
                name: 'HP Spectre',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors');
    }),

    it('should create a new product', async () => {
        const categoryRes = await request(app)
            .post('/api/v1/category/create')
            .send({
                name: 'LAPTOP',
                description: 'Category for laptop' 
            });

        const discountRes = await request(app)
            .post('/api/v1/discount/create')
            .send({
                name: 'BLACK FRIDAY',
                description: 'DIscounts for november',
                percentageOff: 20,
                active: true
            });


        const res = await request(app)
            .post('/api/v1/product/create')
            .send({
                name: 'HP SPectre',
                description: 'sleek laptop',
                sku: "HP002RE",
                quantity: 23,
                price: 340,
                categoryId: categoryRes.body.id,
                discountId: discountRes.body.id
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        id = res.body.id;
    }),

    it('incase product does not exist return 404', async () => {
        const res = await request(app).get('/api/v1/product/46');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    }),

    it('should show a product with id', async () => {
        const res = await request(app).get('/api/v1/product/'+id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    }),

    it('should return error since theres no pagination params', async () => {
        const res = await request(app).get('/api/v1/product/all');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    }),

    it('should show all products', async () => {
        const res = await request(app).get('/api/v1/product/all?page=0&size=10');
        expect(res.statusCode).toEqual(200);
    }),

    it('should update a product', async () => {
        const res = await request(app)
            .put('/api/v1/product/'+id)
            .send({
                quantity: 50,
                price: 340,
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    }),

    it('should delete a product', async () => {
        const res = await request(app)
            .del('/api/v1/product/'+id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})
