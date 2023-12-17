const Joi = require('joi');

module.exports = {
  // POST /v1/seekerProfiles
  createSeekerProfile: {
    body: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      expectedSalary: Joi.number(),
      preferredPlace: Joi.array().items(Joi.string()),
      employed: Joi.boolean(),
      cv: Joi.string().uri(),
    },
  },
};
