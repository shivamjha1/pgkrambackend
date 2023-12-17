// controllers/messaging.controller.js
const httpStatus = require('http-status');
const Messaging = require('../models/messaging.model');

/**
 * Load messaging and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const messaging = await Messaging.findById(id);
    if (!messaging) {
      const err = new Error('Messaging not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { messaging };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new messaging
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const messaging = new Messaging(req.body);
    const savedMessaging = await messaging.save();
    res.status(httpStatus.CREATED);
    res.json(savedMessaging.transform());
  } catch (error) {
    next(error);
  }
};
