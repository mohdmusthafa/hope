const { bookings, rooms, centres } = require('../config/db-config').models;

const getBookingsByCentreId = async (centre_id) => {
    const all_bookings = await bookings.findAll({
        include: 
            {
                model: rooms,
                as: 'room',
                required: true,
                include: {
                    model: centres,
                    as: 'centre',
                    required: true
                }
            },
        attributes: ["id", "from", "to", "room_id"],
        underscored: true
    })

    return all_bookings
}

module.exports = {
    getBookingsByCentreId
}