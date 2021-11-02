const express = require('express');
const social_workers_repo = require('../repository/social_workers.repository');
const common_query = require('../middlewares/common_query');
const router = express.Router();

router.use(common_query);

router.route('/')
    .get(async (req, res) => {
        const social_workers = await social_workers_repo.getAllSocialWorkers(req.centre_id)
        res.status(200).json(social_workers)
    })

module.exports = router;