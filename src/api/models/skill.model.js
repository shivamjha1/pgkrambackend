const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    seekerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SeekerProfile',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
    },
    duration: {
      type: Number,
    },
    completionYear: {
      type: Number,
    },
    certificate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add a transform method to the schema to control the data returned
skillSchema.methods.transform = function () {
  const transformed = {};
  const fields = ['id', 'seekerProfileId', 'name', 'institute', 'duration', 'completionYear', 'certificate', 'createdAt'];

  fields.forEach((field) => {
    transformed[field] = this[field];
  });

  return transformed;
};

module.exports = mongoose.model('Skill', skillSchema);
