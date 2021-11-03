const express = require('express');
const admin_op = require('../middlewares/admin_op');
const router = express.Router();

router.use(admin_op);

router.get('/authenticated', (req, res) => {
    res.status(200).json({ username: req.username, is_admin: Boolean(req.admin), role: req.admin })
})

module.exports = router;