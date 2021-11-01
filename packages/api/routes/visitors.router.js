const express = require('express');
const router = express.Router();

router.get('/authenticated', (req, res) => {
    const response = {
        username: req.username
    }

    res.status(200).json(response);
})

module.exports = router;