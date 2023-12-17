const Joi = require('joi');

module.exports = {
  // POST /v1/feedbacks
  createFeedback: {
    body: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      feedbackType: Joi.string().required(),
      feedbackText: Joi.string().required(),
    },
  },

  // PATCH /v1/feedbacks/:feedbackId
  updateFeedback: {
    body: {
      feedbackType: Joi.string(),
      feedbackText: Joi.string(),
      status: Joi.string().valid('Resolved', 'Pending'),
    },
    params: {
      feedbackId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
