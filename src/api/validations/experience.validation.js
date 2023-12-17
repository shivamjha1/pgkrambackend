const Joi = require('joi');
const SeekerProfile = require('../models/seekerProfile.model');

module.exports = {
  // POST /v1/experience
  createExperience: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      orgName: Joi.string().max(128).required(),
      position: Joi.string().max(128).required(),
      joiningDate: Joi.date().iso().required(),
      location: Joi.string().max(128),
      currentlyWorking: Joi.boolean(),
      leavingDate: Joi.date().iso(),
      lastSalaryDrawn: Joi.number(),
    },
  },

  // PATCH /v1/experience/:experienceId
  updateExperience: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      orgName: Joi.string().max(128),
      position: Joi.string().max(128),
      joiningDate: Joi.date().iso(),
      location: Joi.string().max(128),
      currentlyWorking: Joi.boolean(),
      leavingDate: Joi.date().iso(),
      lastSalaryDrawn: Joi.number(),
    },
    params: {
      experienceId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
