const express = require('express');
const contacts_repo = require('../repository/contacts.repository');

const router = express.Router();

router.get('/', async (req, res) => {
    const { centre_id } = req.query;

    if(!centre_id) {
        return res.status(400).json({ message: 'Please provide centre id' })
    }

    const social_workers = await contacts_repo.getSocialWorkers(centre_id);
    res.status(200).json(social_workers)
})

module.exports = router;