const express = require('express');
const social_workers_repo = require('../repository/social_workers.repository');
const common_query = require('../middlewares/common_query');
const admin_op = require('../middlewares/admin_op');
const router = express.Router();

router.use(common_query);

router.route('/')
    .get(async (req, res) => {
        const social_workers = await social_workers_repo.getAllSocialWorkers(req.centre_id)
        res.status(200).json(social_workers)
    })
    .post(admin_op, async (req, res) => {
        const {
            name,
            designation,
            contact_no,
            address,
        } = req.body;

        const result = await social_workers_repo.addSocialWorker(req.centre_id, {
            name,
            designation,
            contact_no,
            address
        })

        res.status(201).json({ message: `Social worker ${name} added successfully!.` })
    })

module.exports = router;