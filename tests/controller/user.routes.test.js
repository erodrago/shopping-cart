const request = require('supertest');
const express = require('express');

const app = require('../../src/server.js');

describe('User API', () => {
    let uuid = '';

    it('should return error since theres no pagination params', async () => {
        const res = await request(app).get('/api/v1/user/all');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    }),

    it('when creating user and required parameter is not passed return 400', async () => {
        const res = await request(app)
            .post('/api/v1/user/create')
            .send({
                firstName: 'Bob',
                password: '12345678',
                phoneNumber: '3435'
            });
        console.log(res);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message');
    }),

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/v1/user/create')
            .send({
                firstName: 'Bob',
                lastName: 'Doe',
                username: 'bob@doe1.com',
                password: '12345678',
                phoneNumber: '3435'
            });
        console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('uuid');
        uuid = res.body.uuid;
        console.log('UUID'+uuid);
    }),

    it('incase user does not exist return 404', async () => {
        const res = await request(app).get('/api/v1/user/46');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
    }),

    it('should show a user', async () => {
        const res = await request(app).get('/api/v1/user/'+uuid);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('firstName');
    }),

    it('should show all users', async () => {
        const res = await request(app).get('/api/v1/user/all?page=0&size=10');
        expect(res.statusCode).toEqual(200);
        // expect(res.body).toHaveProperty('message');
    }),

    it('should update a user', async () => {
        const res = await request(app)
            .put('/api/v1/user/'+uuid)
            .send({
                firstName: 'Boby',
                lastName: 'Wine',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    }),

    it('should delete a user', async () => {
        const res = await request(app)
            .del('/api/v1/user/'+uuid);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    })
})
