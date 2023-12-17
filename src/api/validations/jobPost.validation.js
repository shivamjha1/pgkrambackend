const Joi = require('joi');

module.exports = {
  // POST /v1/jobPosts
  createJobPost: {
    body: {
      jobTitle: Joi.string().required(),
      providerId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      jobType: Joi.string().required(),
      jobTime: Joi.string().required(),
      jobDescription: Joi.string().required(),
      jobLocation: Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
      salaryType: Joi.string().required(),
      salary: Joi.object().keys({
        minimum: Joi.number().required(),
        maximum: Joi.number().required(),
      }).required(),
      experienceType: Joi.string().required(),
      preferredGender: Joi.string().required(),
      vacancies: Joi.number().required(),
      maximumAge: Joi.number(),
      jobForDifferentlyAbled: Joi.boolean(),
      disabilityType: Joi.string(),
      requiredQualification: Joi.string().required(),
    },
  },

  // PATCH /v1/jobPosts/:jobId
  updateJobPost: {
    body: {
      jobTitle: Joi.string(),
      providerId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      jobType: Joi.string(),
      jobTime: Joi.string(),
      jobDescription: Joi.string(),
      jobLocation: Joi.object().keys({
        latitude: Joi.number(),
        longitude: Joi.number(),
      }),
      salaryType: Joi.string(),
      salary: Joi.object().keys({
        minimum: Joi.number(),
        maximum: Joi.number(),
      }),
      experienceType: Joi.string(),
      preferredGender: Joi.string(),
      vacancies: Joi.number(),
      maximumAge: Joi.number(),
      jobForDifferentlyAbled: Joi.boolean(),
      disabilityType: Joi.string(),
      requiredQualification: Joi.string(),
    },
    params: {
      jobId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
