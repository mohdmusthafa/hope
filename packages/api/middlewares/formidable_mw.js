const formidable = require('formidable');

module.exports = (req, res, next) => {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        req.fields = fields;
        req.files = files;
        next();
    })
}