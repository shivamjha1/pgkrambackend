const httpStatus = require('http-status');
const { omit } = require('lodash');
const Notification = require('../models/notification.model');

/**
 * Load notification and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      const err = new Error('Notification not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { notification };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new notification
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const notification = new Notification(req.body);
    const savedNotification = await notification.save();
    res.status(httpStatus.CREATED);
    res.json(savedNotification.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing notification
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { notification } = req.locals;
    const updatedNotification = omit(req.body, ['_id']);
    Object.assign(notification, updatedNotification);
    const savedNotification = await notification.save();
    res.json(savedNotification.transform());
  } catch (error) {
    next(error);
  }
};
