// validations/providerProfile.validation.js
const Joi = require('joi');

module.exports = {
  // POST /v1/providerProfiles
  createProviderProfile: {
    body: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      name: Joi.string().max(128),
      desc: Joi.string(),
      social: Joi.string(),
      website: Joi.string(),
      sector: Joi.string().valid('Sector1', 'Sector2', 'Sector3'), // Add your sectors
      govInfo: Joi.string(),
      registeredYear: Joi.string(),
    },
  },
};
