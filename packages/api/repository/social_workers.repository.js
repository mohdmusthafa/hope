const { QueryTypes } = require("sequelize");
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
  const insertQry = `INSERT INTO social_workers
    (name, designation, contact_no, address, centre_id)
    VALUES('${social_worker.name}', '${social_worker.designation}', '${social_worker.contact_no}', '${social_worker.address}', ${centre_id});
    `;


  const result = await seqeulize.query(insertQry, { type: QueryTypes.INSERT });
  return result;
};

module.exports = {
  getAllSocialWorkers,
  addSocialWorker,
};
