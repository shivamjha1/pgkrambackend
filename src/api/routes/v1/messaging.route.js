// routes/messaging.route.js
const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/messaging.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const messagingValidation = require('../../validations/messaging.validation');

const router = express.Router();

/**
 * Load messaging when API with messagingId route parameter is hit
 */
router.param('messagingId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/messaging Create Messaging
   * @apiDescription Create a new messaging
   * @apiVersion 1.0.0
   * @apiName CreateMessaging
   * @apiGroup Messaging
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String[]} participants  Array of participant user IDs
   * @apiParam  {Object[]} messages      Array of messages with user ID and content
   *
   * @apiSuccess (Created 201) {String}  id           Messaging's id
   * @apiSuccess (Created 201) {String[]} participants  Array of participant user IDs
   * @apiSuccess (Created 201) {Object[]} messages      Array of messages with user ID and content
   * @apiSuccess (Created 201) {Number}  unreadCount  Unread message count
   * @apiSuccess (Created 201) {Object}  lastMessage  Last message details
   * @apiSuccess (Created 201) {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(/*authorize(LOGGED_USER),*/ validate(messagingValidation.createMessaging), controller.create);

module.exports = router;
