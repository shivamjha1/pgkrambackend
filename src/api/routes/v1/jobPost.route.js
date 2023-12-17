const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/jobPost.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const { createJobPost, updateJobPost } = require('../../validations/jobPost.validation');

const router = express.Router();

/**
 * Load job post when API with jobId route parameter is hit
 */
router.param('jobId', controller.load);

router
  .route('/')
  /**
   * @api {post} v1/jobPosts Create Job Post
   * @apiDescription Create a new job post
   * @apiVersion 1.0.0
   * @apiName CreateJobPost
   * @apiGroup JobPost
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} jobTitle                Job title
   * @apiParam  {String} providerId              Provider's id (ref: Provider)
   * @apiParam  {String} jobType                 Job type (private/government)
   * @apiParam  {String} jobTime                 Job time (fulltime/parttime)
   * @apiParam  {String} jobDescription          Job description
   * @apiParam  {Object} jobLocation             Job location coordinates (latitude/longitude)
   * @apiParam  {String} salaryType              Salary type (daily/weekly/monthly/hourly)
   * @apiParam  {Object} salary                  Salary range (minimum/maximum)
   * @apiParam  {String} experienceType          Experience type (Fresher/Experienced)
   * @apiParam  {String} preferredGender         Preferred gender (male/female/transgender/any)
   * @apiParam  {Number} vacancies               Number of vacancies
   * @apiParam  {Number} [maximumAge]            Maximum age for applicants
   * @apiParam  {Boolean} [jobForDifferentlyAbled] Job for differently-abled (yes/no)
   * @apiParam  {String} [disabilityType]       Disability type
   * @apiParam  {String} requiredQualification   Required qualification
   *
   * @apiSuccess (Created 201) {String}  id       Job Post's id
   * @apiSuccess (Created 201) {String}  jobTitle Job title
   * @apiSuccess (Created 201) {String}  providerId Provider's id (ref: Provider)
   * @apiSuccess (Created 201) {String}  jobType  Job type (private/government)
   * @apiSuccess (Created 201) {String}  jobTime  Job time (fulltime/parttime)
   * @apiSuccess (Created 201) {String}  jobDescription Job description
   * @apiSuccess (Created 201) {Object}  jobLocation Job location coordinates (latitude/longitude)
   * @apiSuccess (Created 201) {String}  salaryType Salary type (daily/weekly/monthly/hourly)
   * @apiSuccess (Created 201) {Object}  salary Salary range (minimum/maximum)
   * @apiSuccess (Created 201) {String}  experienceType Experience type (Fresher/Experienced)
   * @apiSuccess (Created 201) {String}  preferredGender Preferred gender (male/female/transgender/any)
   * @apiSuccess (Created 201) {Number}  vacancies Number of vacancies
   * @apiSuccess (Created 201) {Number}  maximumAge Maximum age for applicants
   * @apiSuccess (Created 201) {Boolean} jobForDifferentlyAbled Job for differently-abled (yes/no)
   * @apiSuccess (Created 201) {String}  disabilityType Disability type
   * @apiSuccess (Created 201) {String}  requiredQualification Required qualification
   * @apiSuccess (Created 201) {Date}    createdAt Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(/*authorize(ADMIN),*/ validate(createJobPost), controller.create);

router
  .route('/:jobId')
  /**
   * @api {patch} v1/jobPosts/:jobId Update Job Post
   * @apiDescription Update some fields of a job post document
   * @apiVersion 1.0.0
   * @apiName UpdateJobPost
   * @apiGroup JobPost
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String} [jobTitle]                Job title
   * @apiParam  {String} [providerId]              Provider's id (ref: Provider)
   * @apiParam  {String} [jobType]                 Job type (private/government)
   * @apiParam  {String} [jobTime]                 Job time (fulltime/parttime)
   * @apiParam  {String} [jobDescription]          Job description
   * @apiParam  {Object} [jobLocation]             Job location coordinates (latitude/longitude)
   * @apiParam  {String} [salaryType]              Salary type (daily/weekly/monthly/hourly)
   * @apiParam  {Object} [salary]                  Salary range (minimum/maximum)
   * @apiParam  {String} [experienceType]          Experience type (Fresher/Experienced)
   * @apiParam  {String} [preferredGender]         Preferred gender (male/female/transgender/any)
   * @apiParam  {Number} [vacancies]               Number of vacancies
   * @apiParam  {Number} [maximumAge]              Maximum age for applicants
   * @apiParam  {Boolean} [jobForDifferentlyAbled] Job for differently-abled (yes/no)
   * @apiParam  {String} [disabilityType]         Disability type
   * @apiParam  {String} [requiredQualification]   Required qualification
   *
   * @apiSuccess {String}  id       Job Post's id
   * @apiSuccess {String}  jobTitle Job title
   * @apiSuccess {String}  providerId Provider's id (ref: Provider)
   * @apiSuccess {String}  jobType  Job type (private/government)
   * @apiSuccess {String}  jobTime  Job time (fulltime/parttime)
   * @apiSuccess {String}  jobDescription Job description
   * @apiSuccess {Object}  jobLocation Job location coordinates (latitude/longitude)
   * @apiSuccess {String}  salaryType Salary type (daily/weekly/monthly/hourly)
   * @apiSuccess {Object}  salary Salary range (minimum/maximum)
   * @apiSuccess {String}  experienceType Experience type (Fresher/Experienced)
   * @apiSuccess {String}  preferredGender Preferred gender (male/female/transgender/any)
   * @apiSuccess {Number}  vacancies Number of vacancies
   * @apiSuccess {Number}  maximumAge Maximum age for applicants
   * @apiSuccess {Boolean} jobForDifferentlyAbled Job for differently-abled (yes/no)
   * @apiSuccess {String}  disabilityType Disability type
   * @apiSuccess {String}  requiredQualification Required qualification
   * @apiSuccess {Date}    createdAt Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only admins can modify the data
   * @apiError (Not Found 404)    NotFound     Job Post does not exist
   */
  .patch(authorize(ADMIN), validate(updateJobPost), controller.update);

module.exports = router;
