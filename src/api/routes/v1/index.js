const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const seekerRoutes = require('./seeker.route')
const router = express.Router();
const providerRoutes=require('./provider.route')
const seekerProfileRoutes=require('./seekerProfile.route')
const educationRoutes=require('./education.route')
const skillRoutes=require('./skill.route')
const experienceRoutes=require('./experience.route')
const jobInterestRoutes=require('./jobInterest.route')
const providerProfileRoutes=require('./providerProfile.route')
const providerAddressRoutes=require('./providerAddress.route')
const messagingRoutes=require('./messaging.route')
const jobPostRoutes=require('./jobPost.route')
const notificationRoutes=require('./notification.route')
const interviewVenueRoutes=require('./interviewVenue.route')
const feedbackRoutes=require('./feedback.route')

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/seekers', seekerRoutes);
router.use('/providers',providerRoutes);
router.use('/seekerProfiles',seekerProfileRoutes);
router.use('/educations',educationRoutes);
router.use('/skills',skillRoutes);
router.use('/experience',experienceRoutes);
router.use('/jobInterest',jobInterestRoutes);
router.use('/providerProfiles', providerProfileRoutes);
router.use('/providerAddresses', providerAddressRoutes);
router.use('/messaging', messagingRoutes);
router.use('/jobPosts', jobPostRoutes);
router.use('/notifications', notificationRoutes);
router.use('/interviewVenues', interviewVenueRoutes);
router.use('/feedbacks',feedbackRoutes);
module.exports = router;
