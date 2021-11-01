const app = require('../app');
const sequelize = require('sequelize');
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
        const token = 'eyJraWQiOiJPcVU1clhyb2M2Sk9KTEpJZVVEMERYZFBxbkdERzFRZW1YNnJlUUZpMDJvPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiOGNjODc0MDAtNGE3MS00NjRkLTg1ZTAtYzk2OGIyN2M5ZjY1Iiwic3ViIjoiZWE2YTU5MDktMzc4Yy00NzNiLWIxNmMtMjg1MWU4MzE0NDA1IiwiZXZlbnRfaWQiOiIzMGU5N2Q5Yi0wNWI4LTRmMmItOThmYi1lYWQ3ZDY3NGJjNWMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjM1NzY4MzYxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xXzdrbEd0RDA2MSIsImV4cCI6MTYzNTc3MTk2MSwiaWF0IjoxNjM1NzY4MzYxLCJqdGkiOiI4MjczZjMzNS1hNjFkLTQwZjUtOTk5Zi03MWE0MzUwYTFmYTAiLCJjbGllbnRfaWQiOiIyb2c1djFuMnA5OGpjN2V1MmZnOHFpMzhtbCIsInVzZXJuYW1lIjoiZWE2YTU5MDktMzc4Yy00NzNiLWIxNmMtMjg1MWU4MzE0NDA1In0.ugBAAFjNJMka7CZ_EoeDmLPSFj6KHt5jZtsoOkl76XEQg93Kp8CQf4ikBf8fqkPHsfERZgHOMIq92bM-OtoePg2sRAWq1wWB9zAf4mAr5mgJLrrz2Fk6AWOs2NmM1rqsgr6Z1FXXMsOLOhcGqP09xg56Eh0dPaV1O0Z-JJCH_yC4xjVLrE6W6Nju4v8PKOgiv0SWLtiDAqfKgajWNLA4d1kHn2kZs8DORjbraVo0shmUwtbGGYWVgH7p6qhgxhSlZueolne2uO2XRBZH-2vsWqN10T5V6-bNaGJG4q6xr0R9nazORHuadVc3qQfbW4Z6wpOv4ZsLSgUvY6EzmGefPw';

        const response = await supertest(app)
            .get('/visitors/authenticated')
            .expect(200)
            .set('authorization', token)
        
        expect(response.body).toBeTruthy()
    })
})