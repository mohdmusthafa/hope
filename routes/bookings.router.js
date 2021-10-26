const express = require('express');
const bookings_repo = require('../repository/bookings.repository')
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        const { centre_id } = req.query;
        const bookings = await bookings_repo.getBookingsByCentreId(centre_id);
        res.status(200).json(bookings)
    })

module.exports = router;