const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/jobInterest.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const { createJobInterest, updateJobInterest } = require('../../validations/jobInterest.validation');

const router = express.Router();

router.param('jobInterestId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/jobInterest Create Job Interest
   * @apiDescription Create a new job interest
   * @apiVersion 1.0.0
   * @apiName CreateJobInterest
   * @apiGroup JobInterest
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiParam  {String} sector          Sector
   * @apiParam  {String} role            Role
   * @apiParam  {String} [description]   Job interest description
   *
   * @apiSuccess (Created 201) {String}  id               Job Interest's id
   * @apiSuccess (Created 201) {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess (Created 201) {String}  sector           Sector
   * @apiSuccess (Created 201) {String}  role             Role
   * @apiSuccess (Created 201) {String}  description      Job interest description
   * @apiSuccess (Created 201) {Date}    createdAt        Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(LOGGED_USER),*/ validate(createJobInterest), controller.create);

router
  .route('/:jobInterestId')
  /**
   * @api {patch} v1/jobInterest/:jobInterestId Update Job Interest
   * @apiDescription Update some fields of a job interest document
   * @apiVersion 1.0.0
   * @apiName UpdateJobInterest
   * @apiGroup JobInterest
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [seekerProfileId] Seeker's profile id (ref: SeekerProfile)
   * @apiParam  {String} [sector]           Sector
   * @apiParam  {String} [role]             Role
   * @apiParam  {String} [description]      Job interest description
   *
   * @apiSuccess {String}  id               Job Interest's id
   * @apiSuccess {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess {String}  sector           Sector
   * @apiSuccess {String}  role             Role
   * @apiSuccess {String}  description      Job interest description
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with the same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Job Interest does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateJobInterest), controller.update);

module.exports = router;
