const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/seeker.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { createSeeker, updateSeeker } = require('../../validations/seeker.validation');

const router = express.Router();

/**
 * Load seeker when API with seekerId route parameter is hit
 */
router.param('seekerId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/seekers List Seekers
   * @apiDescription Get a list of seekers
   * @apiVersion 1.0.0
   * @apiName ListSeekers
   * @apiGroup Seeker
   * @apiPermission admin
   *
   * @apiSuccess {Object[]} seekers List of seekers.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only admins can access the data
   */
  .get(authorize(ADMIN), controller.list)
  /**
   * @api {post} v1/seekers Create Seeker
   * @apiDescription Create a new seeker
   * @apiVersion 1.0.0
   * @apiName CreateSeeker
   * @apiGroup Seeker
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} userId           User's id (ref: User)
   * @apiParam  {String} fullName         Seeker's full name
   * @apiParam  {String} gender           Seeker's gender (Male, Female, Others)
   * @apiParam  {Date}   dob              Seeker's date of birth
   * @apiParam  {String} category         Seeker's category (GEN, GEN-EWS, OBC, SC/ST, Other)
   * @apiParam  {String} maritalStatus    Seeker's marital status
   * @apiParam  {String} [seekerProfileId] Seeker's profile id (ref: SeekerProfile)
   *
   * @apiSuccess (Created 201) {String}  id           Seeker's id
   * @apiSuccess (Created 201) {String}  userId       User's id (ref: User)
   * @apiSuccess (Created 201) {String}  fullName     Seeker's full name
   * @apiSuccess (Created 201) {String}  gender       Seeker's gender
   * @apiSuccess (Created 201) {Date}    dob          Seeker's date of birth
   * @apiSuccess (Created 201) {String}  category     Seeker's category
   * @apiSuccess (Created 201) {String}  maritalStatus Seeker's marital status
   * @apiSuccess (Created 201) {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess (Created 201) {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(ADMIN),*/ validate(createSeeker), controller.create);

router
  .route('/:seekerId')
  /**
   * @api {get} v1/seekers/:seekerId Get Seeker
   * @apiDescription Get seeker information
   * @apiVersion 1.0.0
   * @apiName GetSeeker
   * @apiGroup Seeker
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id           Seeker's id
   * @apiSuccess {String}  userId       User's id (ref: User)
   * @apiSuccess {String}  fullName     Seeker's full name
   * @apiSuccess {String}  gender       Seeker's gender
   * @apiSuccess {Date}    dob          Seeker's date of birth
   * @apiSuccess {String}  category     Seeker's category
   * @apiSuccess {String}  maritalStatus Seeker's marital status
   * @apiSuccess {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess {Date}    createdAt    Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Seeker does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {patch} v1/seekers/:seekerId Update Seeker
   * @apiDescription Update some fields of a seeker document
   * @apiVersion 1.0.0
   * @apiName UpdateSeeker
   * @apiGroup Seeker
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [fullName]     Seeker's full name
   * @apiParam  {String} [gender]       Seeker's gender
   * @apiParam  {Date}   [dob]          Seeker's date of birth
   * @apiParam  {String} [category]     Seeker's category
   * @apiParam  {String} [maritalStatus] Seeker's marital status
   * @apiParam  {String} [seekerProfileId] Seeker's profile id (ref: SeekerProfile)
   *
   * @apiSuccess {String}  id           Seeker's id
   * @apiSuccess {String}  userId       User's id (ref: User)
   * @apiSuccess {String}  fullName     Seeker's full name
   * @apiSuccess {String}  gender       Seeker's gender
   * @apiSuccess {Date}    dob          Seeker's date of birth
   * @apiSuccess {String}  category     Seeker's category
   * @apiSuccess {String}  maritalStatus Seeker's marital status
   * @apiSuccess {String}  seekerProfileId Seeker's profile id (ref: SeekerProfile)
   * @apiSuccess {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Seeker does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateSeeker), controller.update)
  /**
   * @api {delete} v1/seekers/:seekerId Delete Seeker
   * @apiDescription Delete a seeker
   * @apiVersion 1.0.0
   * @apiName DeleteSeeker
   * @apiGroup Seeker
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Seeker does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
