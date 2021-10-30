const express = require('express');
const forms_repo = require('../repository/forms.repository');
const formidable = require('../middlewares/formidable_mw');
const router = express.Router();

router.use(formidable);

router.route('/')
    .get(async (req, res) => {
        const all_uploads = await forms_repo.getUploads(req.username);
        res.status(200).json(all_uploads);
    })
    .post(async (req, res) => {
        const { type, form_date } = req.fields;
        const file = req.files.file;
        const location = await forms_repo.uploadFileToS3(file);
        console.log(location);
        await forms_repo.addFileEntry(type, form_date, location, req.username);
        res.status(201).end();
    })


router.get('/types', async (req, res) => {
    const types = await forms_repo.getTypes();
    res.status(200).json(types);
})

module.exports = router;