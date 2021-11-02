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