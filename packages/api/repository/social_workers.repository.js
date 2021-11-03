const seqeulize = require("../config/db-config");
const models = seqeulize.models;

const getAllSocialWorkers = async (centre_id) => {
  const result = await models.social_workers.findAll({
    where: {
      centre_id,
    },
  });

  return result;
};

const addSocialWorker = async (centre_id, social_worker) => {
    const result = await models.social_workers.create({...social_worker, centreId: centre_id })
  return result;
};

module.exports = {
  getAllSocialWorkers,
  addSocialWorker,
};
