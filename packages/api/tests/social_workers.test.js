const seqeulize = require('../config/db-config');
const { getAllSocialWorkers } = require('../repository/social_workers.repository');

beforeAll(async () => {
    await seqeulize.authenticate()
})

test('get social workers', async () => {
    const result = await getAllSocialWorkers(1)
})

afterAll(async () => {
    await seqeulize.close()
})