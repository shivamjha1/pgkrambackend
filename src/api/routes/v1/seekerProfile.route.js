const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/seekerProfile.controller');
const { authorize, SEEKER } = require('../../middlewares/auth');
const { createSeekerProfile } = require('../../validations/seekerProfile.validation');

const router = express.Router();

/**
 * @api {post} v1/seekerProfiles Create Seeker Profile
 * @apiDescription Create a new seeker profile
 * @apiVersion 1.0.0
 * @apiName CreateSeekerProfile
 * @apiGroup SeekerProfile
 * @apiPermission seeker
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {String}             userId           User's ID
 * @apiParam  {Number}             [expectedSalary] Expected salary
 * @apiParam  {String[]}           [preferredPlace] Preferred places
 * @apiParam  {Boolean}            [employed]       Employment status
 * @apiParam  {String}             [cv]             CV URL
 *
 * @apiSuccess (Created 201) {String}  id                Seeker Profile ID
 * @apiSuccess (Created 201) {String}  userId            User's ID
 * @apiSuccess (Created 201) {Number}  expectedSalary    Expected salary
 * @apiSuccess (Created 201) {String[]} preferredPlace   Preferred places
 * @apiSuccess (Created 201) {Boolean} employed          Employment status
 * @apiSuccess (Created 201) {String}  cv                CV URL
 * @apiSuccess (Created 201) {Date}    createdAt         Timestamp
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated seekers can create the data
 * @apiError (Forbidden 403)     Forbidden        Only seekers can create the data
 */
router.route('/').post(/*authorize(SEEKER),*/ validate(createSeekerProfile), controller.createSeekerProfile);

module.exports = router;
