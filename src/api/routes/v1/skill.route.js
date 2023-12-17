const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/skill.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const skillValidation = require('../../validations/skill.validation');

const router = express.Router();

/**
 * Load skill when API with skillId route parameter is hit
 */
router.param('skillId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/skills Create Skill
   * @apiDescription Create a new skill
   * @apiVersion 1.0.0
   * @apiName CreateSkill
   * @apiGroup Skill
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} seekerProfileId Seeker Profile's id (ref: SeekerProfile)
   * @apiParam  {String} name             Skill name
   * @apiParam  {String} [institute]      Institute
   * @apiParam  {Number} [duration]       Duration
   * @apiParam  {Number} [completionYear] Completion year
   * @apiParam  {String} [certificate]    Certificate URL
   *
   * @apiSuccess (Created 201) {String}  id           Skill's id
   * @apiSuccess (Created 201) {String}  seekerProfileId Seeker Profile's id (ref: SeekerProfile)
   * @apiSuccess (Created 201) {String}  name         Skill name
   * @apiSuccess (Created 201) {String}  institute    Institute
   * @apiSuccess (Created 201) {Number}  duration     Duration
   * @apiSuccess (Created 201) {Number}  completionYear Completion year
   * @apiSuccess (Created 201) {String}  certificate  Certificate URL
   * @apiSuccess (Created 201) {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only users can create their own skills
   */
  .post(/*authorize(LOGGED_USER),*/ validate(skillValidation.createSkill), controller.create);

router
  .route('/:skillId')
  /**
   * @api {patch} v1/skills/:skillId Update Skill
   * @apiDescription Update some fields of a skill document
   * @apiVersion 1.0.0
   * @apiName UpdateSkill
   * @apiGroup Skill
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [seekerProfileId] Seeker Profile's id (ref: SeekerProfile)
   * @apiParam  {String} [name]             Skill name
   * @apiParam  {String} [institute]        Institute
   * @apiParam  {Number} [duration]         Duration
   * @apiParam  {Number} [completionYear]   Completion year
   * @apiParam  {String} [certificate]      Certificate URL
   *
   * @apiSuccess {String}  id           Skill's id
   * @apiSuccess {String}  seekerProfileId Seeker Profile's id (ref: SeekerProfile)
   * @apiSuccess {String}  name         Skill name
   * @apiSuccess {String}  institute    Institute
   * @apiSuccess {Number}  duration     Duration
   * @apiSuccess {Number}  completionYear Completion year
   * @apiSuccess {String}  certificate  Certificate URL
   * @apiSuccess {Date}    createdAt    Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Skill does not exist
   */
  .patch(authorize(LOGGED_USER), validate(skillValidation.updateSkill), controller.update);

module.exports = router;
