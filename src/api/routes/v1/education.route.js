const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/eduaction.controller');
const { authorize, SEEKER } = require('../../middlewares/auth');
const { createEducation } = require('../../validations/education.validation');

const router = express.Router();

/**
 * @api {post} v1/educations Create Education
 * @apiDescription Create a new education entry
 * @apiVersion 1.0.0
 * @apiName CreateEducation
 * @apiGroup Education
 * @apiPermission seeker
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             seekerProfileId  Seeker Profile ID
 * @apiParam  {String}             qualification    Qualification
 * @apiParam  {String}             medium           Medium of education
 * @apiParam  {String}             boardOrUniversity Board or University
 * @apiParam  {String}             course           Course
 * @apiParam  {String}             scoreType        Score type
 * @apiParam  {String}             score            Score
 * @apiParam  {String}             yearOfPassing    Year of passing
 * @apiParam  {String}             certificate      Certificate URL
 *
 * @apiSuccess (Created 201) {String}  id                Education ID
 * @apiSuccess (Created 201) {String}  seekerProfileId  Seeker Profile ID
 * @apiSuccess (Created 201) {String}  qualification    Qualification
 * @apiSuccess (Created 201) {String}  medium           Medium of education
 * @apiSuccess (Created 201) {String}  boardOrUniversity Board or University
 * @apiSuccess (Created 201) {String}  course           Course
 * @apiSuccess (Created 201) {String}  scoreType        Score type
 * @apiSuccess (Created 201) {String}  score            Score
 * @apiSuccess (Created 201) {String}  yearOfPassing    Year of passing
 * @apiSuccess (Created 201) {String}  certificate      Certificate URL
 * @apiSuccess (Created 201) {Date}    createdAt         Timestamp
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated seekers can create the data
 * @apiError (Forbidden 403)     Forbidden        Only seekers can create the data
 */
router.route('/').post(/*authorize(SEEKER),*/ validate(createEducation), controller.createEducation);

module.exports = router;
