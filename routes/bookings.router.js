const express = require('express');
const bookings_repo = require('../repository/bookings.repository')
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const { centre_id, from, to } = req.query;
        
        if (!centre_id && !from && !to) {
            res.status(400).json({ message: 'Please provide centre_id and from and to '})
        }
        const bookings = await bookings_repo.getBookings(centre_id, from, to);
        res.status(200).json(bookings)
    })

router.get('/available-rooms', async (req, res) => {
    const { centre_id, from, to } = req.query;

    if (!centre_id && !from && !to) {
        res.status(400).json({ message: 'Please provide centre_id and from and to '})
    }

    const available_rooms = await bookings_repo.getAvailableRooms(centre_id, from, to);
    res.status(200).json(available_rooms)
})

router.get('/total-rooms', async (req, res) => {
    const { centre_id } = req.query;

    if(!centre_id) {
        res.status(400).json({ message: 'Please provide centre id' })
    }

    const total_rooms = await bookings_repo.totalRooms(centre_id);
    res.status(200).json({
        total_rooms
    })
})

module.exports = router;