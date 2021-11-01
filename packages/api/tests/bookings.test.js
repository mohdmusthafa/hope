const sequelize = require('../config/db-config');
const { getBookings, getAvailableRooms, totalRooms } = require("../repository/bookings.repository");

beforeAll(async () => {
    await sequelize.authenticate()
})

test("get bookings result is valid", async () => {
  const result = await getBookings(1, "2021-01-01", "2022-01-02");
  expect(result).toBeTruthy();
});

test('get available rooms is valid', async () => {
    const result = await getAvailableRooms(1, "2021-01-01", "2022-01-02");
    expect(result).toBeTruthy();
})

test('get total rooms to be a number', async () => {
    const result = await totalRooms(1);
    expect(typeof(result)).toBe('number')
})

afterAll(async () => {
    await sequelize.close();
})