const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');

exports.load = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error('User not found');
      error.status = httpStatus.NOT_FOUND;
      return next(error);
    }
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => res.json(req.locals.user);

exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const updatedUser = Object.assign(user, req.body);
    const savedUser = await updatedUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { user } = req.locals;
    await user.remove();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
