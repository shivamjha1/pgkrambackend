const httpStatus = require('http-status');
const SeekerProfile = require('../models/seekerProfile.model');
const APIError = require('../errors/api-error');

/**
 * Create new seeker profile
 * @public
 */
exports.createSeekerProfile = async (req, res, next) => {
  try {
    const seekerProfile = new SeekerProfile(req.body);
    const savedSeekerProfile = await seekerProfile.save();
    res.status(httpStatus.CREATED);
    res.json(savedSeekerProfile);
  } catch (error) {
    next(error);
  }
};
