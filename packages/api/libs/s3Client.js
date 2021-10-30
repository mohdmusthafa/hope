const { S3Client } = require('@aws-sdk/client-s3');

const REGION = process.env.S3_BUCKET_REGION || 'ap-south-1';

const s3Client = new S3Client({ region: REGION });

module.exports = { s3Client };