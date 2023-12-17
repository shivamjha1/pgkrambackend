const httpStatus = require('http-status');
const { omit } = require('lodash');
const Provider = require('../models/provider.model');

/**
 * Load provider and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Provider not found' });
    }
    req.locals = { provider };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get provider
 * @public
 */
exports.get = (req, res) => res.json(req.locals.provider);

/**
 * Create new provider
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const provider = new Provider(req.body);
    const savedProvider = await provider.save();
    res.status(httpStatus.CREATED);
    res.json(savedProvider);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing provider
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { provider } = req.locals;
    const updatedProvider = omit(req.body, ['userId']);
    const updatedProviderObject = Object.assign(provider, updatedProvider);
    const savedProvider = await updatedProviderObject.save();
    res.json(savedProvider);
  } catch (error) {
    next(error);
  }
};

/**
 * Get provider list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete provider
 * @public
 */
exports.remove = async (req, res, next) => {
  const { provider } = req.locals;

  provider.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
