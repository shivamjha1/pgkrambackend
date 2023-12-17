// validations/messaging.validation.js
const Joi = require('joi');

module.exports = {
  // POST /v1/messaging
  createMessaging: {
    body: {
      participants: Joi.array().items(Joi.string().regex(/^[a-fA-F0-9]{24}$/)).min(2).required(),
      messages: Joi.array().items({
        userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        content: Joi.string().required(),
      }),
    },
  },
};
