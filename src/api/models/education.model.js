const mongoose = require('mongoose');
const { Schema } = mongoose;

const educationSchema = new Schema(
  {
    seekerProfileId: {
      type: Schema.Types.ObjectId,
      ref: 'SeekerProfile',
      required: true,
    },
    qualification: {
      type: String,
      enum: ['High School', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Other'],
      required: true,
    },
    medium: {
      type: String,
      enum: ['English', 'Hindi', 'Punjabi'],
      required: true,
    },
    boardOrUniversity: {
      type: String,
    },
    course: {
      type: String,
    },
    scoreType: {
      type: String,
    },
    score: {
      type: String,
    },
    yearOfPassing: {
      type: String,
    },
    certificate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
