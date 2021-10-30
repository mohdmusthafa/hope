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
    .post((req, res) => {
        const { type, form_date } = req.fields;
        // const location = await uploadFileToS3(file);
        const location = 's3:/home/uploads/';
        // await addFileEntry(type, form_date);
        res.status(201).end();
    })

module.exports = router;