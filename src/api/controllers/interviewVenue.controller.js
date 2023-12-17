const httpStatus = require('http-status');
const { omit } = require('lodash');
const InterviewVenue = require('../models/interviewVenue.model');

/**
 * Load interview venue and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const interviewVenue = await InterviewVenue.findById(id);
    if (!interviewVenue) {
      const err = new Error('Interview Venue not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { interviewVenue };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new interview venue
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const interviewVenue = new InterviewVenue(req.body);
    const savedInterviewVenue = await interviewVenue.save();
    res.status(httpStatus.CREATED);
    res.json(savedInterviewVenue.transform());
  } catch (error) {
    next(error);
  }
};
