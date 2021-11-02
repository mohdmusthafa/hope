const seqeulize = require('../config/db-config');
const { getTypes } = require('../repository/forms.repository');

beforeAll(async () => {
    await seqeulize.authenticate();
})


test('get types to be valid', async () => {
    const result = await getTypes();
    expect(result).toBeTruthy();
})

afterAll(async () => {
    await seqeulize.close();
})