const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/interviewVenue.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const { createInterviewVenue } = require('../../validations/interviewVenue.validation');

const router = express.Router();

/**
 * Load interview venue when API with interviewVenueId route parameter is hit
 */
router.param('interviewVenueId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/interviewVenues Create Interview Venue
   * @apiDescription Create a new interview venue
   * @apiVersion 1.0.0
   * @apiName CreateInterviewVenue
   * @apiGroup InterviewVenue
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} jobpostId        Job Post's id (ref: JobPost)
   * @apiParam  {String} addressLine1     Address Line 1
   * @apiParam  {String} addressLine2     Address Line 2
   * @apiParam  {String} contactPerson    Contact Person's name
   * @apiParam  {String} designation      Contact Person's designation
   * @apiParam  {String} phoneNumber      Contact Person's phone number
   * @apiParam  {String} city             City
   * @apiParam  {Date}   interviewDate    Interview Date
   *
   * @apiSuccess (Created 201) {String}  id               Interview Venue's id
   * @apiSuccess (Created 201) {String}  jobpostId        Job Post's id (ref: JobPost)
   * @apiSuccess (Created 201) {String}  addressLine1     Address Line 1
   * @apiSuccess (Created 201) {String}  addressLine2     Address Line 2
   * @apiSuccess (Created 201) {String}  contactPerson    Contact Person's name
   * @apiSuccess (Created 201) {String}  designation      Contact Person's designation
   * @apiSuccess (Created 201) {String}  phoneNumber      Contact Person's phone number
   * @apiSuccess (Created 201) {String}  city             City
   * @apiSuccess (Created 201) {Date}    interviewDate    Interview Date
   * @apiSuccess (Created 201) {Date}    createdAt        Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(ADMIN),*/ validate(createInterviewVenue), controller.create);

module.exports = router;
