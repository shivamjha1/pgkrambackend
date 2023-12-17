const httpStatus = require('http-status');
const Education = require('../models/education.model');

/**
 * Create new education entry
 * @public
 */
exports.createEducation = async (req, res, next) => {
  try {
    const education = new Education(req.body);
    const savedEducation = await education.save();
    res.status(httpStatus.CREATED);
    res.json(savedEducation);
  } catch (error) {
    next(error);
  }
};
