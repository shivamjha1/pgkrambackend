const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/notification.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const validation = require('../../validations/notification.validation');

const router = express.Router();

/**
 * Load notification when API with notificationId route parameter is hit
 */
router.param('notificationId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/notifications Create Notification
   * @apiDescription Create a new notification
   * @apiVersion 1.0.0
   * @apiName CreateNotification
   * @apiGroup Notification
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} recipientId       Recipient's id (ref: User)
   * @apiParam  {String} notificationType  Notification type
   * @apiParam  {String} message           Notification message
   * @apiParam  {String} [status]          Notification status (read, unread, dumped)
   *
   * @apiSuccess (Created 201) {String}  id                 Notification's id
   * @apiSuccess (Created 201) {String}  recipientId        Recipient's id (ref: User)
   * @apiSuccess (Created 201) {String}  notificationType   Notification type
   * @apiSuccess (Created 201) {String}  message            Notification message
   * @apiSuccess (Created 201) {String}  status             Notification status
   * @apiSuccess (Created 201) {Date}    createdAt          Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(/*authorize(LOGGED_USER),*/ validate(validation.createNotification), controller.create);

router
  .route('/:notificationId')
  /**
   * @api {patch} v1/notifications/:notificationId Update Notification
   * @apiDescription Update some fields of a notification document
   * @apiVersion 1.0.0
   * @apiName UpdateNotification
   * @apiGroup Notification
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [recipientId]      Recipient's id (ref: User)
   * @apiParam  {String} [notificationType] Notification type
   * @apiParam  {String} [message]          Notification message
   * @apiParam  {String} [status]           Notification status (read, unread, dumped)
   *
   * @apiSuccess {String}  id               Notification's id
   * @apiSuccess {String}  recipientId      Recipient's id (ref: User)
   * @apiSuccess {String}  notificationType Notification type
   * @apiSuccess {String}  message          Notification message
   * @apiSuccess {String}  status           Notification status
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Notification does not exist
   */
  .patch(authorize(LOGGED_USER), validate(validation.updateNotification), controller.update);

module.exports = router;
