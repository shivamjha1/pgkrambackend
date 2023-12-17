const Joi = require('joi');

module.exports = {
  // POST /v1/interviewVenues
  createInterviewVenue: {
    body: {
      jobpostId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      addressLine1: Joi.string().required(),
      addressLine2: Joi.string().required(),
      contactPerson: Joi.string().required(),
      designation: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      city: Joi.string().required(),
      interviewDate: Joi.date().required(),
    },
  },
};
