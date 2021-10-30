const { QueryTypes } = require('sequelize')
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../libs/s3Client');
const fs = require('fs/promises');
const sequelize = require('../config/db-config');
const models = sequelize.models;

const getUploads = async (username) => {
    const uploads = await models.forms.findAll({
        where: {
            uploaded_by_id: username
        }
    })

    return uploads;
}

const uploadFileToS3 = async (file) => {
    const data = await fs.readFile(file.path);

    const region = process.env.REGION || 'ap-south-1';
    const params = {
        Bucket: process.env.BUCKET || 'hopedev',
        Key: file.name,
        Body: data
    }

    const results = await s3Client.send(new PutObjectCommand(params));
    await fs.unlink(file.path);
    const location = `https://${params.Bucket}.s3.${region}.amazonaws.com/${file.name}`;
    return encodeURI(location);
}

const addFileEntry = async (type, form_date, location, username) => {
    await sequelize.query(
        `INSERT INTO public.forms
        ("location", form_date, uploaded_by_id, type_name)
        VALUES('${location}', '${form_date}', '${username}', '${type}');`,
        {
            type: QueryTypes.INSERT
        }
    )

    return;
}

const getTypes = async () => {
    const types = await models.form_types.findAll();
    return types.map(type => type.name);
}

module.exports = {
    getUploads,
    addFileEntry,
    uploadFileToS3,
    getTypes
}