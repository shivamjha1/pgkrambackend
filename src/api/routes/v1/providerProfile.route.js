// routes/providerProfile.route.js
const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/providerProfile.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const { createProviderProfile } = require('../../validations/providerProfile.validation');

const router = express.Router();

/**
 * Load provider profile when API with providerProfileId route parameter is hit
 */
router.param('providerProfileId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/providerProfiles Create Provider Profile
   * @apiDescription Create a new provider profile
   * @apiVersion 1.0.0
   * @apiName CreateProviderProfile
   * @apiGroup ProviderProfile
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} userId           User's id (ref: User)
   * @apiParam  {String} [name]           Provider profile name
   * @apiParam  {String} [desc]           Provider profile description
   * @apiParam  {String} [social]         Social media link
   * @apiParam  {String} [website]        Provider website
   * @apiParam  {String} [sector]         Provider sector
   * @apiParam  {String} [govInfo]        Government information
   * @apiParam  {String} [registeredYear] Registered year
   *
   * @apiSuccess (Created 201) {String}  id              ProviderProfile's id
   * @apiSuccess (Created 201) {String}  userId          User's id (ref: User)
   * @apiSuccess (Created 201) {String}  name            Provider profile name
   * @apiSuccess (Created 201) {String}  desc            Provider profile description
   * @apiSuccess (Created 201) {String}  social          Social media link
   * @apiSuccess (Created 201) {String}  website         Provider website
   * @apiSuccess (Created 201) {String}  sector          Provider sector
   * @apiSuccess (Created 201) {String}  govInfo         Government information
   * @apiSuccess (Created 201) {String}  registeredYear  Registered year
   * @apiSuccess (Created 201) {Date}    createdAt       Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(ADMIN),*/ validate(createProviderProfile), controller.create);

module.exports = router;
