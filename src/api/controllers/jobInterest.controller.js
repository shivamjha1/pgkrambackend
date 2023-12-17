const httpStatus = require('http-status');
const { omit } = require('lodash');
const JobInterest = require('../models/jobInterest.model');
const SeekerProfile = require('../models/seekerProfile.model');

/**
 * Load jobInterest and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const jobInterest = await JobInterest.get(id);
    req.locals = { jobInterest };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new jobInterest
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const jobInterest = new JobInterest(req.body);
    const savedJobInterest = await jobInterest.save();
    res.status(httpStatus.CREATED);
    res.json(savedJobInterest.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing jobInterest
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { jobInterest } = req.locals;
    const updatedJobInterest = req.body;
    const newJobInterest = Object.assign(jobInterest, updatedJobInterest);

    const savedJobInterest = await newJobInterest.save();
    res.json(savedJobInterest.transform());
  } catch (error) {
    next(error);
  }
};
