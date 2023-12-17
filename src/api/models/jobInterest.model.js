const mongoose = require('mongoose');

const jobInterestSchema = mongoose.Schema(
  {
    seekerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SeekerProfile',
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Transform the mongoose document to a JSON object with a custom format
 * @returns {Object} - Transformed object
 */
jobInterestSchema.methods.transform = function () {
  const transformed = {};
  const fields = ['id', 'seekerProfileId', 'sector', 'role', 'description', 'createdAt'];

  fields.forEach((field) => {
    transformed[field] = this[field];
  });

  return transformed;
};

/**
 * @typedef JobInterest
 */
const JobInterest = mongoose.model('JobInterest', jobInterestSchema);

module.exports = JobInterest;
