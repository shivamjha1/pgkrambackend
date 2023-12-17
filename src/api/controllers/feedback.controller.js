const httpStatus = require('http-status');
const { omit } = require('lodash');
const Feedback = require('../models/feedback.model');

/**
 * Load feedback and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      const err = new Error('Feedback not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { feedback };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new feedback
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();
    res.status(httpStatus.CREATED);
    res.json(savedFeedback.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Get feedback details
 * @public
 */
exports.get = (req, res) => res.json(req.locals.feedback.transform());

/**
 * Update existing feedback
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { feedback } = req.locals;
    const updatedFeedback = omit(req.body, ['_id']);
    Object.assign(feedback, updatedFeedback);
    const savedFeedback = await feedback.save();
    res.json(savedFeedback.transform());
  } catch (error) {
    next(error);
  }
};
