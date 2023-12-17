const httpStatus = require('http-status');
const { omit } = require('lodash');
const Seeker = require('../models/seeker.model');

/**
 * Load seeker and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const seeker = await Seeker.findById(id);
    if (!seeker) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Seeker not found' });
    }
    req.locals = { seeker };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get seeker
 * @public
 */
exports.get = (req, res) => res.json(req.locals.seeker);

/**
 * Create new seeker
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const seeker = new Seeker(req.body);
    const savedSeeker = await seeker.save();
    res.status(httpStatus.CREATED);
    res.json(savedSeeker);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing seeker
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { seeker } = req.locals;
    const updatedSeeker = omit(req.body, ['userId']);
    const updatedSeekerObject = Object.assign(seeker, updatedSeeker);
    const savedSeeker = await updatedSeekerObject.save();
    res.json(savedSeeker);
  } catch (error) {
    next(error);
  }
};

/**
 * Get seeker list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const seekers = await Seeker.find();
    res.json(seekers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete seeker
 * @public
 */
exports.remove = async (req, res, next) => {
  const { seeker } = req.locals;

  seeker.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
