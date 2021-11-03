const express = require('express');
const router = express.Router();

router.get('/authenticated', (req, res) => {
    res.status(200).json({ username: req.username, is_admin: Boolean(req.admin), role: req.admin })
})

module.exports = router;