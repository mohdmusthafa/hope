const express = require('express');

const bookings_router = require('./routes/bookings.router');

const app = express();

app.use(express.json());
app.use('/bookings', bookings_router)

module.exports = app;