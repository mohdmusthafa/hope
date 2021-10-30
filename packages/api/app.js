const express = require('express');
const jwt = require('./middlewares/jwt');

const bookings_router = require('./routes/bookings.router');
const contacts_router = require('./routes/contacts.router');
const forms_router = require('./routes/forms.router');

const app = express();

app.use(jwt);
app.use(express.json());
app.use('/bookings', bookings_router)
app.use('/contacts', contacts_router)
app.use('/forms', forms_router)

module.exports = app;