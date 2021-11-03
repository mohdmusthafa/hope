'use strict';

module.exports.postAuth = async (event, context) => {
  const userAttributes = event.request.userAttributes;

  const {
    sub: username,
    name,
    address,
    phone_number: contact_no
  } = userAttributes;

  const request = {
    username,
    name,
    address,
    contact_no
  }

  console.log(request);
  context.done(null, event);
};
