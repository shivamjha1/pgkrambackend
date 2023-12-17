const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/experience.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const { createExperience, updateExperience } = require('../../validations/experience.validation');

const router = express.Router();

router.param('experienceId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/experience Create Experience
   * @apiDescription Create a new experience
   * @apiVersion 1.0.0
   * @apiName CreateExperience
   * @apiGroup Experience
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiParam  {String} orgName          Organization name
   * @apiParam  {String} position         Position
   * @apiParam  {Date}   joiningDate      Joining date
   * @apiParam  {String} [location]       Location
   * @apiParam  {Boolean} [currentlyWorking]  Currently working status
   * @apiParam  {Date}   [leavingDate]    Leaving date
   * @apiParam  {Number} [lastSalaryDrawn] Last drawn salary
   *
   * @apiSuccess (Created 201) {String}  id               Experience's id
   * @apiSuccess (Created 201) {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess (Created 201) {String}  orgName          Organization name
   * @apiSuccess (Created 201) {String}  position         Position
   * @apiSuccess (Created 201) {Date}    joiningDate      Joining date
   * @apiSuccess (Created 201) {String}  location         Location
   * @apiSuccess (Created 201) {Boolean} currentlyWorking Currently working status
   * @apiSuccess (Created 201) {Date}    leavingDate      Leaving date
   * @apiSuccess (Created 201) {Number}  lastSalaryDrawn  Last drawn salary
   * @apiSuccess (Created 201) {Date}    createdAt        Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(LOGGED_USER),*/ validate(createExperience), controller.create);

router
  .route('/:experienceId')
  /**
   * @api {patch} v1/experience/:experienceId Update Experience
   * @apiDescription Update some fields of an experience document
   * @apiVersion 1.0.0
   * @apiName UpdateExperience
   * @apiGroup Experience
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [seekerProfileId] Seeker's profile id (ref: SeekerProfile)
   * @apiParam  {String} [orgName]          Organization name
   * @apiParam  {String} [position]         Position
   * @apiParam  {Date}   [joiningDate]      Joining date
   * @apiParam  {String} [location]         Location
   * @apiParam  {Boolean} [currentlyWorking]  Currently working status
   * @apiParam  {Date}   [leavingDate]    Leaving date
   * @apiParam  {Number} [lastSalaryDrawn] Last drawn salary
   *
   * @apiSuccess {String}  id               Experience's id
   * @apiSuccess {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess {String}  orgName          Organization name
   * @apiSuccess {String}  position         Position
   * @apiSuccess {Date}    joiningDate      Joining date
   * @apiSuccess {String}  location         Location
   * @apiSuccess {Boolean} currentlyWorking Currently working status
   * @apiSuccess {Date}    leavingDate      Leaving date
   * @apiSuccess {Number}  lastSalaryDrawn  Last drawn salary
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with the same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Experience does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateExperience), controller.update);

module.exports = router;
