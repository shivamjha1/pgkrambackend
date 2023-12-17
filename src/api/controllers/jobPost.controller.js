const httpStatus = require('http-status');
const { omit } = require('lodash');
const JobPost = require('../models/jobPost.model');

/**
 * Load job post and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const jobPost = await JobPost.findById(id);
    if (!jobPost) {
      const err = new Error('Job Post not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { jobPost };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new job post
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const jobPost = new JobPost(req.body);
    const savedJobPost = await jobPost.save();
    res.status(httpStatus.CREATED);
    res.json(savedJobPost.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing job post
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { jobPost } = req.locals;
    const updatedJobPost = omit(req.body, ['_id']);
    Object.assign(jobPost, updatedJobPost);
    const savedJobPost = await jobPost.save();
    res.json(savedJobPost.transform());
  } catch (error) {
    next(error);
  }
};
