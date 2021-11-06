const express = require('express');
const bookings_repo = require('../repository/bookings.repository');
const common_query = require('../middlewares/common_query');
const router = express.Router();


router.delete('/', async (req, res) => {
    const { id } = req.query;
    
    if(!id) {
        return res.status(400).json({ message: 'Please provide id' })
    }

    await bookings_repo.deleteBooking(id);
    res.status(200).json({ message: `Booking ${id} deleted successfully!` })
})


// Routes below requires centre_id and other common queries to be 
// provided within the request
router.use(common_query);

router.route('/')
    .get(async (req, res) => {
        const { from, to } = req.query;
        
        if (!from && !to) {
            return res.status(400).json({ message: 'Please provide from and to '})
        }
        const bookings = await bookings_repo.getBookings(req.centre_id, from, to);
        res.status(200).json(bookings)
    })
    .post(async (req, res) => {
        const { from, to, room_id } = req.body;

        if(!from && !to && !room_id) {
            return res.status(400).json({ message: 'Please provide from, to and room_id'})
        }

        const booking = await bookings_repo.addBookings(req.centre_id, from, to, room_id, req.username);
        res.status(201).json({ message: 'Booked'});
    })

router.get('/available-rooms', async (req, res) => {
    const { from, to } = req.query;

    if (!from && !to) {
        return res.status(400).json({ message: 'Please provide from and to'})
    }

    const available_rooms = await bookings_repo.getAvailableRooms(req.centre_id, from, to);
    res.status(200).json(available_rooms)
})

router.get('/total-rooms', async (req, res) => {
    const total_rooms = await bookings_repo.totalRooms(req.centre_id);
    res.status(200).json({
        total_rooms
    })
})

module.exports = router;