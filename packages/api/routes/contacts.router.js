const express = require('express');
const contacts_repo = require('../repository/contacts.repository');
const common_query = require('../middlewares/common_query');

const router = express.Router();

router.use(common_query);

router.get('/', async (req, res) => {
    const social_workers = await contacts_repo.getSocialWorkers(req.centre_id);
    res.status(200).json(social_workers)
})

module.exports = router;