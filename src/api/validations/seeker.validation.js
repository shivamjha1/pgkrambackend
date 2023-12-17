const Joi = require('joi');

module.exports = {
  // POST /v1/seekers
  createSeeker: {
    body: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      fullName: Joi.string().required(),
      gender: Joi.string().valid('Male', 'Female', 'Others').required(),
      dob: Joi.date().iso().required(),
      category: Joi.string().valid('GEN', 'GEN-EWS', 'OBC', 'SC/ST', 'Other').required(),
      maritalStatus: Joi.string().required(),
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // PATCH /v1/seekers/:seekerId
  updateSeeker: {
    body: {
      fullName: Joi.string(),
      gender: Joi.string().valid('Male', 'Female', 'Others'),
      dob: Joi.date().iso(),
      category: Joi.string().valid('GEN', 'GEN-EWS', 'OBC', 'SC/ST', 'Other'),
      maritalStatus: Joi.string(),
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
    params: {
      seekerId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
