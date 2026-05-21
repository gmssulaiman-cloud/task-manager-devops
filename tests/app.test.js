const request = require('supertest');
const app = require('../app');

describe('Task API', () => {

    test('Health endpoint works', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
    });

    test('Login successful', async () => {

        const res = await request(app)
            .post('/login')
            .send({
                username: 'admin',
                password: 'admin123'
            });

        expect(res.statusCode).toBe(200);
    });

    test('Login failed', async () => {

        const res = await request(app)
            .post('/login')
            .send({
                username: 'wrong',
                password: 'wrong'
            });

        expect(res.statusCode).toBe(401);
    });

});