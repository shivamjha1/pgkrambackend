const Joi = require('joi');
const SeekerProfile = require('../models/seekerProfile.model');

module.exports = {
  // POST /v1/jobInterest
  createJobInterest: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      sector: Joi.string().required(),
      role: Joi.string().required(),
      description: Joi.string(),
    },
  },

  // PATCH /v1/jobInterest/:jobInterestId
  updateJobInterest: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      sector: Joi.string(),
      role: Joi.string(),
      description: Joi.string(),
    },
    params: {
      jobInterestId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
