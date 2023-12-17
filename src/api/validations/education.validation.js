const Joi = require('joi');

module.exports = {
  // POST /v1/educations
  createEducation: {
    body: {
      seekerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      qualification: Joi.string().valid(
        'High School',
        'Diploma',
        'Bachelor\'s Degree',
        'Master\'s Degree',
        'PhD',
        'Other'
      ).required(),
      medium: Joi.string().valid('English', 'Hindi', 'Punjabi').required(),
      boardOrUniversity: Joi.string(),
      course: Joi.string(),
      scoreType: Joi.string(),
      score: Joi.string(),
      yearOfPassing: Joi.string(),
      certificate: Joi.string(),
    },
  },
};
