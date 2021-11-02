const supertest = require('supertest');
const app = require('../../app');
const seqeulize = require('../../config/db-config');
const fs = require('fs/promises');

const token = process.env.TEST_TOKEN;

beforeAll(async () => {
    await seqeulize.authenticate()
})

describe('bookings routes', () => {
    test('list bookings', async () => {
        const result = await supertest(app)
            .get('/bookings/')
            .query({ centre_id: 1, from: "2020-12-01", to: "2021-02-01" })
            .set('authorization', token)
            .expect(200)

        expect(result).toBeTruthy();
    })

    test('list bookings should not work if no query provided', async () => {
        await supertest(app)
            .get('/bookings/')
            .set('authorization', token)
            .expect(400)
    })

    test('list bookings should not work if no from and to provided', async () => {
        await supertest(app)
            .get('/bookings/')
            .query({ centre_id: 1 })
            .set('authorization', token)
            .expect(400)
    })

    test('list available rooms', async () => {
        const result = await supertest(app)
            .get('/bookings/available-rooms')
            .query({ centre_id: 1, from: "2020-12-01", to: "2021-02-01" })
            .set('authorization', token)
            .expect(200)
        
        expect(result).toBeTruthy();
    })

    test('available bookings should not work if no query provided', async () => {
        await supertest(app)
            .get('/bookings/available-rooms')
            .set('authorization', token)
            .expect(400)
    })

    test('available bookings should not work if no from and to provided', async () => {
        await supertest(app)
            .get('/bookings/available-rooms')
            .query({ centre_id: 1 })
            .set('authorization', token)
            .expect(400)
    })

    test('get total rooms', async () => {
        const result = await supertest(app)
            .get('/bookings/total-rooms')
            .query({ centre_id: 1 })
            .set('authorization', token)
            .expect(200)
        expect(typeof(result.body.total_rooms)).toBe('number')
    })

    test('get total rooms should not work when no centre_id provided', async () => {
        await supertest(app)
            .get('/bookings/total-rooms')
            .set('authorization', token)
            .expect(400)
    })
})

describe('contacts routes', () => {
    test('get all contacts', async () => {
        const result = await supertest(app)
            .get('/contacts/')
            .query({ centre_id: 1 })
            .set('authorization', token)
            .expect(200)
        expect(result.body).toBeTruthy()
    })

    test('get all contacts should not work when no centre_id provided', async () => {
        await supertest(app)
            .get('/contacts/')
            .set('authorization', token)
            .expect(400)
    })
})

describe('forms routes', () => {
    test('get uploads', async () => {
        const result = await supertest(app)
            .get('/forms/')
            .set('authorization', token)
            .expect(200)
        expect(result.body).toBeTruthy()
    })

    test('upload file', async () => {
        console.log(__dirname)
        const file = await fs.readFile(__dirname + '/app.test.js')
        const file_buffer = Buffer.from(file);

        await supertest(app)
            .post('/forms')
            .set('authorization', token)
            .attach('file', file_buffer, 'somefile.js')
            .field('type', 'Medical Prescription')
            .field('form_date', '2020-01-01')
            .expect(201)
    }, 10000)

    test('get types', async () => {
        const result = await supertest(app)
            .get('/forms/types')
            .set('authorization', token)
            .expect(200)
        expect(result.body).toBeTruthy()
    })
})

describe('social workers routes', () => {
    test('get all social workers', async () => {
        const result = await supertest(app)
            .get('/social_workers/')
            .query({ centre_id: 1 })
            .set('authorization', token)
            .expect(200)
        expect(result.body).toBeTruthy()
    })

    test('get all social workers should not work when no centre_id is provided', async () => {
        await supertest(app)
            .get('/social_workers/')
            .set('authorization', token)
            .expect(400)
    })
})

afterAll(async () => {
    await seqeulize.close()
})