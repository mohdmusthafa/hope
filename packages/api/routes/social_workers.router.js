const express = require('express');
const social_workers_repo = require('../repository/social_workers.repository');
const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        const { centre_id } = req.query;
        if (!centre_id) {
            return res.status(400).json({ message: 'Please provide centre_id' })
        }

        const social_workers = await social_workers_repo.getAllSocialWorkers(centre_id)
        res.status(200).json(social_workers)
    })

module.exports = router;