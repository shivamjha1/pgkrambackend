const mongoose = require('mongoose');
const httpStatus = require('http-status');

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedbackType: {
      type: String,
      required: true,
    },
    feedbackText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Resolved', 'Pending'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Methods
 */
feedbackSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'userId', 'feedbackType', 'feedbackText', 'status', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
