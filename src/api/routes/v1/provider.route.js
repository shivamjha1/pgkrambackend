const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/provider.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const {
  listProviders,
  createProvider,
  updateProvider,
} = require('../../validations/provider.validation');

const router = express.Router();

/**
 * Load provider when API with providerId route parameter is hit
 */
router.param('providerId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/providers List Providers
   * @apiDescription Get a list of providers
   * @apiVersion 1.0.0
   * @apiName ListProviders
   * @apiGroup Provider
   * @apiPermission admin
   *
   * @apiSuccess {Object[]} providers List of providers.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only admins can access the data
   */
  .get(authorize(ADMIN), validate(listProviders), controller.list)
  /**
   * @api {post} v1/providers Create Provider
   * @apiDescription Create a new provider
   * @apiVersion 1.0.0
   * @apiName CreateProvider
   * @apiGroup Provider
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} userId           User's id (ref: User)
   * @apiParam  {String} fullName         Provider's full name
   * @apiParam  {String[]} phone          Provider's phone numbers
   * @apiParam  {String} email            Provider's email
   * @apiParam  {String} [designation]    Provider's designation
   * @apiParam  {String} [providerProfileId] Provider's profile id (ref: ProviderProfile)
   *
   * @apiSuccess (Created 201) {String}  id           Provider's id
   * @apiSuccess (Created 201) {String}  userId       User's id (ref: User)
   * @apiSuccess (Created 201) {String}  fullName     Provider's full name
   * @apiSuccess (Created 201) {String[]} phone        Provider's phone numbers
   * @apiSuccess (Created 201) {String}  email        Provider's email
   * @apiSuccess (Created 201) {String}  designation  Provider's designation
   * @apiSuccess (Created 201) {String}  providerProfileId Provider's profile id (ref: ProviderProfile)
   * @apiSuccess (Created 201) {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(ADMIN),*/ validate(createProvider), controller.create);

router
  .route('/:providerId')
  /**
   * @api {get} v1/providers/:providerId Get Provider
   * @apiDescription Get provider information
   * @apiVersion 1.0.0
   * @apiName GetProvider
   * @apiGroup Provider
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id           Provider's id
   * @apiSuccess {String}  userId       User's id (ref: User)
   * @apiSuccess {String}  fullName     Provider's full name
   * @apiSuccess {String[]} phone        Provider's phone numbers
   * @apiSuccess {String}  email        Provider's email
   * @apiSuccess {String}  designation  Provider's designation
   * @apiSuccess {String}  providerProfileId Provider's profile id (ref: ProviderProfile)
   * @apiSuccess {Date}    createdAt    Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Provider does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {patch} v1/providers/:providerId Update Provider
   * @apiDescription Update some fields of a provider document
   * @apiVersion 1.0.0
   * @apiName UpdateProvider
   * @apiGroup Provider
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [fullName]         Provider's full name
   * @apiParam  {String[]} [phone]          Provider's phone numbers
   * @apiParam  {String} [email]            Provider's email
   * @apiParam  {String} [designation]      Provider's designation
   * @apiParam  {String} [providerProfileId] Provider's profile id (ref: ProviderProfile)
   *
   * @apiSuccess {String}  id           Provider's id
   * @apiSuccess {String}  userId       User's id (ref: User)
   * @apiSuccess (Updated 200) {String}  fullName     Provider's full name
   * @apiSuccess (Updated 200) {String[]} phone        Provider's phone numbers
   * @apiSuccess (Updated 200) {String}  email        Provider's email
   * @apiSuccess (Updated 200) {String}  designation  Provider's designation
   * @apiSuccess (Updated 200) {String}  providerProfileId Provider's profile id (ref: ProviderProfile)
   * @apiSuccess (Updated 200) {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Provider does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateProvider), controller.update)
  /**
   * @api {delete} v1/providers/:providerId Delete Provider
   * @apiDescription Delete a provider
   * @apiVersion 1.0.0
   * @apiName DeleteProvider
   * @apiGroup Provider
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Provider does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
