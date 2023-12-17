const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    jobType: {
      type: String,
      enum: ['private', 'government'],
      required: true,
    },
    jobTime: {
      type: String,
      enum: ['fulltime', 'parttime'],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobLocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    salaryType: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'hourly'],
      required: true,
    },
    salary: {
      minimum: {
        type: Number,
        required: true,
      },
      maximum: {
        type: Number,
        required: true,
      },
    },
    experienceType: {
      type: String,
      enum: ['Fresher', 'Experienced'],
      required: true,
    },
    preferredGender: {
      type: String,
      enum: ['male', 'female', 'transgender', 'any'],
      required: true,
    },
    vacancies: {
      type: Number,
      required: true,
    },
    maximumAge: {
      type: Number,
    },
    jobForDifferentlyAbled: {
      type: Boolean,
      default: false,
    },
    disabilityType: {
      type: String,
      enum: [
        'no disability',
        'Learning disabilities',
        'speech disability',
        'health impairments',
        'Autism',
        'Intellectual disabilities',
        'development delay',
        'Emotional Disturbance',
        'Multiple disabilities',
        'others',
      ],
    },
    requiredQualification: {
      type: String,
      enum: [
        'No schooling',
        '5th',
        '8th',
        '10th',
        '12th',
        'diploma',
        'ITI',
        'Graduate',
        'PG diploma',
        'post graduate',
        'm phil',
        'PhD',
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Transform the saved instance before sending the response
jobPostSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'jobTitle',
      'providerId',
      'jobType',
      'jobTime',
      'jobDescription',
      'jobLocation',
      'salaryType',
      'salary',
      'experienceType',
      'preferredGender',
      'vacancies',
      'maximumAge',
      'jobForDifferentlyAbled',
      'disabilityType',
      'requiredQualification',
      'createdAt',
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

module.exports = mongoose.model('JobPost', jobPostSchema);
