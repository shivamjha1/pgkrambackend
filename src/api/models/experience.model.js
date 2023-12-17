const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    seekerProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SeekerProfile',
      required: true,
    },
    orgName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    leavingDate: {
      type: Date,
    },
    lastSalaryDrawn: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Add a transform method to the schema to control the data returned
experienceSchema.methods.transform = function () {
  const transformed = {};
  const fields = ['id', 'seekerProfileId', 'orgName', 'position', 'joiningDate', 'location', 'currentlyWorking', 'leavingDate', 'lastSalaryDrawn', 'createdAt'];

  fields.forEach((field) => {
    transformed[field] = this[field];
  });

  return transformed;
};

module.exports = mongoose.model('Experience', experienceSchema);
