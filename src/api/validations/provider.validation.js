const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {
  // GET /v1/providers
  listProviders: {
    query: {
      // Define any query parameters for listing providers (if needed)
    },
  },

  // POST /v1/providers
  createProvider: {
    body: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
        .description('User ID reference (ref: User)'),
      fullName: Joi.string().required().description("Provider's full name"),
      phone: Joi.array().items(Joi.string()).description("Provider's phone numbers"),
      email: Joi.string().email().required().description("Provider's email"),
      designation: Joi.string().description("Provider's designation"),
      providerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).description("Provider's profile ID reference (ref: ProviderProfile)"),
    },
  },

  // PATCH /v1/providers/:providerId
  updateProvider: {
    body: {
      fullName: Joi.string().description("Provider's full name"),
      phone: Joi.array().items(Joi.string()).description("Provider's phone numbers"),
      email: Joi.string().email().description("Provider's email"),
      designation: Joi.string().description("Provider's designation"),
      providerProfileId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).description("Provider's profile ID reference (ref: ProviderProfile)"),
    },
    params: {
      providerId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required().description("Provider's ID"),
    },
  },
};
