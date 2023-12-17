// routes/providerAddress.route.js
const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/providerAddress.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const providerAddressValidation = require('../../validations/poviderAddress.validation');

const router = express.Router();

/**
 * Load provider address when API with providerAddressId route parameter is hit
 */
router.param('providerAddressId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/providerAddresses Create Provider Address
   * @apiDescription Create a new provider address
   * @apiVersion 1.0.0
   * @apiName CreateProviderAddress
   * @apiGroup ProviderAddress
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} providerProfileId Provider Profile's id (ref: ProviderProfile)
   * @apiParam  {String} line1             Address Line 1
   * @apiParam  {String} [line2]           Address Line 2
   * @apiParam  {String} state             State (enum: all Indian states)
   * @apiParam  {String} city              City
   * @apiParam  {String} pincode           Pincode
   *
   * @apiSuccess (Created 201) {String}  id              Provider Address's id
   * @apiSuccess (Created 201) {String}  providerProfileId Provider Profile's id (ref: ProviderProfile)
   * @apiSuccess (Created 201) {String}  line1           Address Line 1
   * @apiSuccess (Created 201) {String}  line2           Address Line 2
   * @apiSuccess (Created 201) {String}  state           State
   * @apiSuccess (Created 201) {String}  city            City
   * @apiSuccess (Created 201) {String}  pincode         Pincode
   * @apiSuccess (Created 201) {Date}    createdAt       Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only users can create their own provider addresses
   */
  .post(/*authorize(LOGGED_USER),*/ validate(providerAddressValidation.createProviderAddress), controller.create);

router
  .route('/:providerAddressId')
  /**
   * @api {patch} v1/providerAddresses/:providerAddressId Update Provider Address
   * @apiDescription Update some fields of a provider address document
   * @apiVersion 1.0.0
   * @apiName UpdateProviderAddress
   * @apiGroup ProviderAddress
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [providerProfileId] Provider Profile's id (ref: ProviderProfile)
   * @apiParam  {String} [line1]             Address Line 1
   * @apiParam  {String} [line2]             Address Line 2
   * @apiParam  {String} [state]             State
   * @apiParam  {String} [city]              City
   * @apiParam  {String} [pincode]           Pincode
   *
   * @apiSuccess {String}  id              Provider Address's id
   * @apiSuccess {String}  providerProfileId Provider Profile's id (ref: ProviderProfile)
   * @apiSuccess {String}  line1           Address Line 1
   * @apiSuccess {String}  line2           Address Line 2
   * @apiSuccess {String}  state           State
   * @apiSuccess {String}  city            City
   * @apiSuccess {String}  pincode         Pincode
   * @apiSuccess {Date}    createdAt       Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with the same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Provider Address does not exist
   */
  .patch(authorize(LOGGED_USER), validate(providerAddressValidation.updateProviderAddress), controller.update);

module.exports = router;
