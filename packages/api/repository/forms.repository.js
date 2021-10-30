const { models } = require('../config/db-config');

const getUploads = async (username) => {
    const uploads = await models.forms.findAll({
        where: {
            uploaded_by_id: username
        }
    })

    return uploads;
}

module.exports = {
    getUploads
}