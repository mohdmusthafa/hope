const { models } = require('../config/db-config');

const getAllSocialWorkers = async (centre_id) => {
    const result = await models.social_workers.findAll({
        where: {
            centre_id
        }
    })

    return result
}

module.exports = {
    getAllSocialWorkers
}