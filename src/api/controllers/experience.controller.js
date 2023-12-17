const httpStatus = require('http-status');
const { omit } = require('lodash');
const Experience = require('../models/experience.model');
const SeekerProfile = require('../models/seekerProfile.model');

/**
 * Load experience and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const experience = await Experience.get(id);
    req.locals = { experience };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new experience
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const experience = new Experience(req.body);
    const savedExperience = await experience.save();
    res.status(httpStatus.CREATED);
    res.json(savedExperience.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing experience
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { experience } = req.locals;
    const updatedExperience = req.body;
    const newExperience = Object.assign(experience, updatedExperience);

    const savedExperience = await newExperience.save();
    res.json(savedExperience.transform());
  } catch (error) {
    next(error);
  }
};
