const Joi = require('joi');

module.exports = {
  // POST /v1/skills
  createSkill: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      name: Joi.string().required(),
      institute: Joi.string(),
      duration: Joi.number(),
      completionYear: Joi.number(),
      certificate: Joi.string(),
    },
  },

  // PUT /v1/skills/:skillId
  updateSkill: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      name: Joi.string(),
      institute: Joi.string(),
      duration: Joi.number(),
      completionYear: Joi.number(),
      certificate: Joi.string(),
    },
    params: {
      skillId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
