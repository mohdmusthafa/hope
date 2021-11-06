const express = require('express');
const contacts_repo = require('../repository/contacts.repository');
const common_query = require('../middlewares/common_query');

const router = express.Router();


router.delete('/', async (req, res) => {
    const { id } = req.query;
    await contacts_repo.deleteSocialWorker(id);
    res.status(200).json({ message: `${id} deleted successfully!`});
})

router.put('/', async (req, res) => {
    const { id } = req.query;
    const { name, designation, contact_no, address } = req.body;

    if(!name && !designation && !contact_no && !address) {
        return res.status(400).json({ message: 'Please provide name, designation, contact no and address'})
    }

    const result = await contacts_repo.updateSocialWorker(id, name, designation, contact_no, address, req.centre_id);
    res.status(200).json({ message: `${name} updated successfully!`})
})


router.use(common_query);

router.get('/', async (req, res) => {
    const social_workers = await contacts_repo.getSocialWorkers(req.centre_id);
    res.status(200).json(social_workers)
})

router.post('/', async(req, res) => {
    const { name, designation, contact_no, address } = req.body;

    if(!name && !designation && !contact_no && !address) {
        return res.status(400).json({ message: 'Please provide name, designation, contact no and address'})
    }

    const result = await contacts_repo.addSocialWorker(name, designation, contact_no, address, req.centre_id);
    res.status(201).json({ message: `${name} added successfully!`})
})


module.exports = router;