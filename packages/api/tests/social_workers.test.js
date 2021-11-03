const seqeulize = require('../config/db-config');
const { getAllSocialWorkers, addSocialWorker } = require('../repository/social_workers.repository');

beforeAll(async () => {
    await seqeulize.authenticate()
})

test('get social workers', async () => {
    const result = await getAllSocialWorkers(1)
})

test('add social worker', async () => {
    await addSocialWorker(1, {
        name: 'Social worker 2',
        designation: 'Care Taker',
        contact_no: '+917902554689',
        address: '123 Avenue Std.'
    })
})

afterAll(async () => {
    await seqeulize.close()
})