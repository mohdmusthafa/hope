'use strict';
const connectToDatabase = require('./config/db-config');

module.exports.postAuth = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; 
  const userAttributes = event.request.userAttributes;

  const {
    sub: id,
    name,
    address,
    phone_number: contact_no
  } = userAttributes;


  const request = {
    id,
    name,
    address,
    contact_no
  }

  console.log(request);

  const DB = await connectToDatabase();
  const result = await DB.models.visitors.create(request)
  console.log("New user added");
  await DB.close();
  context.done(null, event);
};
