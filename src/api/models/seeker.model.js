const mongoose = require('mongoose');

const seekerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: ['GEN', 'GEN-EWS', 'OBC', 'SC/ST', 'Other'],
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    seekerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SeekerProfile',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Seeker', seekerSchema);
