const Joi = require('joi');

module.exports = {
  // POST /v1/notifications
  createNotification: {
    body: {
      recipientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
      notificationType: Joi.string().required(),
      message: Joi.string().required(),
      status: Joi.string().valid('read', 'unread', 'dumped'),
    },
  },

  // PATCH /v1/notifications/:notificationId
  updateNotification: {
    body: {
      recipientId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      notificationType: Joi.string(),
      message: Joi.string(),
      status: Joi.string().valid('read', 'unread', 'dumped'),
    },
    params: {
      notificationId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
