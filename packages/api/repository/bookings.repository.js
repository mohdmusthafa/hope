const { models } = require("../config/db-config");
const Op = require("sequelize").Op;

const getBookings = async (centre_id, from, to) => {
  const result = await models.bookings.findAll({
      where: {
          centre_id,
          from: {
              [Op.gt]: from
          },
          to: {
              [Op.lt]: to
          }
      }
  })

  return result;
};

const getAvailableRooms = async (centre_id, from, to) => {
    const booked_rooms = await getBookings(centre_id, from, to);
    const booked_rooms_id = booked_rooms.map(value => value.id);

    const rooms = models.rooms.findAll({
        where: {
            centre_id,
            id: {
                [Op.notIn]: booked_rooms_id
            }
        }
    })

    return rooms;
}

const totalRooms = async (centre_id) => {
    const result = await models.rooms.count({
        where: {
            centre_id
        }
    })
    return result;
}

module.exports = {
  getBookings,
  getAvailableRooms,
  totalRooms
};
