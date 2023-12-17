const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const validations = require('../../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/users Create User
   * @apiDescription Create a new user
   * @apiVersion 1.0.0
   * @apiName CreateUser
   * @apiGroup User
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             firebaseId User's Firebase ID
   * @apiParam  {String}             [email]    User's email
   * @apiParam  {String}             [mobile]   User's mobile
   * @apiParam  {String}             authType   User's authentication type
   * @apiParam  {String=SEEKER,PROVIDER}  role User's role
   *
   * @apiSuccess (Created 201) {Object}  user      User object
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(validate(validations.createUser), controller.create);

router
  .route('/:userId')
  /**
   * @api {get} v1/users/:userId Get User
   * @apiDescription Get user information
   * @apiVersion 1.0.0
   * @apiName GetUser
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object}  user User object
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {patch} v1/users/:userId Update User
   * @apiDescription Update some fields of a user document
   * @apiVersion 1.0.0
   * @apiName UpdateUser
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             [email]    User's email
   * @apiParam  {String}             [mobile]   User's mobile
   * @apiParam  {String}             [authType] User's authentication type
   * @apiParam  {String=SEEKER,PROVIDER}  [role] User's role
   *
   * @apiSuccess {Object}  user User object
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(LOGGED_USER), validate(validations.updateUser), controller.update)
  /**
   * @api {delete} v1/users/:userId Delete User
   * @apiDescription Delete a user
   * @apiVersion 1.0.0
   * @apiName DeleteUser
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
