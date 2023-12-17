const mongoose = require('mongoose');
const { Schema } = mongoose;

const seekerProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expectedSalary: {
      type: Number,
    },
    preferredPlace: {
      type: [String],
    },
    employed: {
      type: Boolean,
    },
    cv: {
      type: String,
      validate: {
        validator: (value) => {
          // Basic URL validation
          const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlRegex.test(value);
        },
        message: 'Invalid URL for CV',
      },
    },
  },
  { timestamps: true }
);

const SeekerProfile = mongoose.model('SeekerProfile', seekerProfileSchema);

module.exports = SeekerProfile;
