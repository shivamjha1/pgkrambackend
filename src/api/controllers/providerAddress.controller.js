// controllers/providerAddress.controller.js
const httpStatus = require('http-status');
const { omit } = require('lodash');
const ProviderAddress = require('../models/providerAddress.model');

/**
 * Load provider address and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const providerAddress = await ProviderAddress.findById(id);
    if (!providerAddress) {
      const err = new Error('Provider Address not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { providerAddress };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new provider address
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const providerAddress = new ProviderAddress(req.body);
    const savedProviderAddress = await providerAddress.save();
    res.status(httpStatus.CREATED);
    res.json(savedProviderAddress); // Remove .transform() here
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing provider address
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { providerAddress } = req.locals;
    const updatedProviderAddress = omit(req.body, ['_id']);
    Object.assign(providerAddress, updatedProviderAddress);
    const savedProviderAddress = await providerAddress.save();
    res.json(savedProviderAddress); // Remove .transform() here
  } catch (error) {
    next(error);
  }
};
