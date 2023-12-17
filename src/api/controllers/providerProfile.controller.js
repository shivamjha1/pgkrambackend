// providerProfile.controller.js

const httpStatus = require('http-status');
const { omit } = require('lodash');
const ProviderProfile = require('../models/providerProfile.model');

/**
 * Load provider profile and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const providerProfile = await ProviderProfile.findById(id);
    if (!providerProfile) {
      const err = new Error('Provider Profile not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { providerProfile };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new provider profile
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const providerProfile = new ProviderProfile(req.body);
    const savedProviderProfile = await providerProfile.save();
    res.status(httpStatus.CREATED);
    res.json(savedProviderProfile.toJSON()); // Assuming toJSON is your transform function
  } catch (error) {
    next(error);
  }
};
