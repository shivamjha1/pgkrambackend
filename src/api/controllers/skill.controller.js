const httpStatus = require('http-status');
const { omit } = require('lodash');
const Skill = require('../models/skill.model');

/**
 * Load skill and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      const err = new Error('Skill not found');
      err.status = httpStatus.NOT_FOUND;
      return next(err);
    }
    req.locals = { skill };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new skill
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    res.status(httpStatus.CREATED);
    res.json(savedSkill.transform());
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing skill
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { skill } = req.locals;
    const updatedSkill = omit(req.body, ['_id']);
    Object.assign(skill, updatedSkill);
    const savedSkill = await skill.save();
    res.json(savedSkill.transform());
  } catch (error) {
    next(error);
  }
};
