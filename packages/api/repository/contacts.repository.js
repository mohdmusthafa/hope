const { models } = require('../config/db-config');

const getSocialWorkers = async (centre_id) => {
    const result = await models.social_workers.findAll({
        where: {
            centre_id
        }
    });
    return result;
}

const addSocialWorker = async (name, designation, contact_no, address, centre_id) => {
    const request = {
        name,
        designation,
        contact_no,
        address,
        centreId: centre_id
    }

    const result = await models.social_workers.create(request)
    return result;
}

const updateSocialWorker = async (id, name, designation, contact_no, address, centre_id) => {
    const request = {
        name,
        designation,
        contact_no,
        address,
        centreId: centre_id
    }
    
    const result = await models.social_workers.update(request, { where: { id: id }});
    return result;
}

const deleteSocialWorker = async (id) => {
    const result = await models.social_workers.destroy({ where: { id: id }})
    return result;
}

module.exports = {
    getSocialWorkers,
    addSocialWorker,
    updateSocialWorker,
    deleteSocialWorker
}