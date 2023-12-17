const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/feedback.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const feedbackValidation = require('../../validations/feedback.validation');

const router = express.Router();

/**
 * Load feedback when API with feedbackId route parameter is hit
 */
router.param('feedbackId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/feedbacks Create Feedback
   * @apiDescription Create a new feedback
   * @apiVersion 1.0.0
   * @apiName CreateFeedback
   * @apiGroup Feedback
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} userId           User's id (ref: User)
   * @apiParam  {String} feedbackType     Feedback type
   * @apiParam  {String} feedbackText     Feedback text
   *
   * @apiSuccess (Created 201) {String}  id            Feedback's id
   * @apiSuccess (Created 201) {String}  userId        User's id (ref: User)
   * @apiSuccess (Created 201) {String}  feedbackType  Feedback type
   * @apiSuccess (Created 201) {String}  feedbackText  Feedback text
   * @apiSuccess (Created 201) {String}  status        Feedback status
   * @apiSuccess (Created 201) {Date}    createdAt     Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(/*authorize(LOGGED_USER),*/ validate(feedbackValidation.createFeedback), controller.create);

router
  .route('/:feedbackId')
  /**
   * @api {get} v1/feedbacks/:feedbackId Get Feedback
   * @apiDescription Get feedback information
   * @apiVersion 1.0.0
   * @apiName GetFeedback
   * @apiGroup Feedback
   * @apiPermission user
   *
   * @apiHeader {String} Authorization  User's access token
   *
   * @apiSuccess {String}  id            Feedback's id
   * @apiSuccess {String}  userId        User's id (ref: User)
   * @apiSuccess {String}  feedbackType  Feedback type
   * @apiSuccess {String}  feedbackText  Feedback text
   * @apiSuccess {String}  status        Feedback status
   * @apiSuccess {Date}    createdAt     Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Feedback does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {patch} v1/feedbacks/:feedbackId Update Feedback
   * @apiDescription Update some fields of a feedback document
   * @apiVersion 1.0.0
   * @apiName UpdateFeedback
   * @apiGroup Feedback
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [feedbackType]  Feedback type
   * @apiParam  {String} [feedbackText]  Feedback text
   * @apiParam  {String} [status]        Feedback status
   *
   * @apiSuccess {String}  id            Feedback's id
   * @apiSuccess {String}  userId        User's id (ref: User)
   * @apiSuccess {String}  feedbackType  Feedback type
   * @apiSuccess {String}  feedbackText  Feedback text
   * @apiSuccess {String}  status        Feedback status
   * @apiSuccess {Date}    createdAt     Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Feedback does not exist
   */
  .patch(authorize(LOGGED_USER), validate(feedbackValidation.updateFeedback), controller.update);

module.exports = router;
