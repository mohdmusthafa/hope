const app = require('../../app');
const supertest = require('supertest');

describe('cognito jwt authorization middleware', () => {
    it('should fail if no token is provided', async () => {
        const token = '';

        const response = await supertest(app)
            .get('/visitors/authenticated')
            .expect(401)
            .set('authorization', token)
        
            expect(response.body).toMatchObject({
                message: 'Invalid token'
            })
    })

    it('should succeed when valid token is provided', async () => {
       const token = process.env.TEST_TOKEN;
       
        const response = await supertest(app)
            .get('/visitors/authenticated')
            .expect(200)
            .set('authorization', token)
        
        expect(response.body).toBeTruthy()
    })
})

describe('cognito jwt id token authorization middleware', () => {
    it('should fail if access token is provided instead id token', async () => {
        await supertest(app)
            .get('/users/authenticated')
            .expect(401)
            .set('authorization', process.env.TEST_TOKEN)
    })

    it('should succeed if valid id token is provided with admin permissions', async () => {
        await supertest(app)
            .get('/users/authenticated')
            .set('authorization', process.env.TEST_ADMIN_TOKEN)
            .expect(200)
    })
})