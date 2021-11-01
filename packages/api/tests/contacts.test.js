const sequelize = require('../config/db-config');
const { getSocialWorkers } = require('../repository/contacts.repository');

beforeAll(async () => {
    await sequelize.authenticate();
})

test('get social workers to be valid', async () => {
    const result = await getSocialWorkers(1);
    expect(result).toBeTruthy();
})

afterAll(async () => {
    await sequelize.close();
})