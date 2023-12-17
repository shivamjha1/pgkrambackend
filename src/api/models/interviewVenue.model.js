const mongoose = require('mongoose');

const interviewVenueSchema = new mongoose.Schema(
  {
    jobpostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPost',
      required: true,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    designation: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    city: {
      type: String,
    },
    interviewDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Transform the saved instance before sending the response
interviewVenueSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'jobpostId',
      'addressLine1',
      'addressLine2',
      'contactPerson',
      'designation',
      'phoneNumber',
      'city',
      'interviewDate',
      'createdAt',
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

module.exports = mongoose.model('InterviewVenue', interviewVenueSchema);
