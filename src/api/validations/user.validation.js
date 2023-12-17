const Joi = require('joi');

module.exports = {
  createUser: {
    body: {
      firebaseId: Joi.string().required(),
      email: Joi.string().email(),
      mobile: Joi.string(),
      authType: Joi.string().valid('EMAIL', 'PHONE', 'SOCIAL_GOOGLE', 'SOCIAL_FACEBOOK').required(),
      role: Joi.string().valid('SEEKER', 'PROVIDER').required(),
    },
  },

  updateUser: {
    body: {
      email: Joi.string().email(),
      mobile: Joi.string(),
      authType: Joi.string().valid('EMAIL', 'PHONE', 'SOCIAL_GOOGLE', 'SOCIAL_FACEBOOK'),
      role: Joi.string().valid('SEEKER', 'PROVIDER'),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
